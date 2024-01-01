import puppeteer from 'puppeteer';
import { UserDto } from '../user/dtos/users.dto';
import { IPEntity } from 'src/entitys/ips.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Not, Repository } from 'typeorm';
import { handleSuccessRequest } from '../../models/common';
import { convertEntityToDto } from '../../utils/converts';
import { ReportsEntity } from 'src/entitys/reports.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserRoles, UserStatus } from 'src/entitys/users.entity';

@Injectable()
export class CookieManagementJobService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(IPEntity) private ipRepo: Repository<IPEntity>,
    @InjectRepository(ReportsEntity)
    private reportRepo: Repository<ReportsEntity>,
  ) { }

  async getAllIP(userId: string) {
    return await this.ipRepo.find({
      select: {
        cookieData: true,
      },
      where: {
        user: { id: userId },
        cookieData: Not(In(['[]', 'null'])),
        updatedAt: Between(
          new Date(new Date().setHours(-24, 0, 0, 0)),
          new Date(new Date().setHours(-1, 59, 0, 0))
        ),
      },
    });
  }

  async getAllMembers() {
    return this.userRepo
      .find({
        where: {
          role: UserRoles.MEMBER,
          status: UserStatus.ACTIVE,
          displayName: Like('%member%'),
        },
      })
      .then((res) => {
        let listUsers = [];
        listUsers = res.map((user) => convertEntityToDto(user, new UserDto()));
        return handleSuccessRequest(listUsers);
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  mapData(data: Array<any>) {
    if (!data || data.length == 0) return [];
    const results: Array<any> = [];
    const browsers = Array.from(new Set(data.map((item: any) => item.browser)));
    const profiles = Array.from(new Set(data.map((item: any) => item.profile)));
    browsers.forEach((b) => {
      const tmpItem: Partial<any> = {};
      tmpItem['browser'] = b;

      profiles.forEach((p) => {
        tmpItem['profile'] = p;
        const groupItem = data.filter(
          (d) =>
            d.browser == b && d.profile == p && d.domain.includes('facebook'),
        );

        if (groupItem.length > 0) {
          results.push({
            browser: b,
            profile: p,
            cookies: groupItem,
          });
        }
      });
    });

    return results;
  }

  async CheckActiveAccount() {
    try {
      console.log('Start');
      process.setMaxListeners(0);
      const listMembers = await this.getAllMembers();
      const report: any[] = [];

      for (const user of listMembers.data) {
        let totalSuccess = 0;
        let totalFail = 0;
        let listData = [];
        listData = await this.getAllIP(user.id);

        for (const data of listData) {
          if (data && data.cookieData) {
            let listCookies = [];
            listCookies = this.mapData(JSON.parse(data.cookieData));

            for (const cookie of listCookies) {
              if (cookie.cookies) {
                const browser = await puppeteer.launch({
                  defaultViewport: null,
                  args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
                });

                const fbPage = await browser.newPage();

                await fbPage.setCookie(...cookie.cookies);
                await fbPage
                  .goto('https://www.facebook.com/me')
                  .then(async (res) => {
                    if (res.url() !== 'https://www.facebook.com/') totalSuccess++;
                    else totalFail++;

                    await browser.close();
                  });
              }
            }
          }
        }

        report.push({
          user: user,
          totalSuccess: totalSuccess,
          totalFail: totalFail,
        });
      }

      console.log('End');
      return this.reportRepo.save(report);
    } catch (error) {
      console.log(error);
    }
  }
}
