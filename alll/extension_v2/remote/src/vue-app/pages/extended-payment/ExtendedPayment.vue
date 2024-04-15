<template>
  <div class="comp-wrapper" style="height: auto">
    <div class="top">
      <div>
        <img src="@images/show-config.svg" alt="" class="top-icon" />
      </div>
      <div>
        <div>Display settings</div>
        <div>Customize display of ad account information</div>
      </div>
    </div>
    <div class="d-between setting-box">
      <label
        for="toggleBubble"
        style="
          color: rgb(0, 0, 0);
          font-family: Bold;
          opacity: 0.7;
          font-size: 12px;
        "
      >
        Show data bubbles
      </label>
      <div
        class="item-toggle form-check form-switch"
        style="transform: translateY(2px)"
      >
        <input
          type="checkbox"
          id="toggleBubble"
          class="form-check-input item-toggle-input"
        />
      </div>
    </div>
    <div class="d-between setting-box">
      <label
        for="toggleRename"
        style="
          color: rgb(0, 0, 0);
          font-family: Bold;
          opacity: 0.7;
          font-size: 12px;
        "
      >
        Rename acc in bubble
      </label>
      <div
        class="item-toggle form-check form-switch"
        style="transform: translateY(2px)"
      >
        <input
          type="checkbox"
          id="toggleRename"
          class="form-check-input item-toggle-input"
        />
      </div>
    </div>
    <div class="setting-box">
      <div class="d-between" style="flex-wrap: wrap">
        <div class="item">
          <div class="item-left item-name">Account</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="name"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-limit">Spending limit /day</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="limit"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-thresh">Current Threshold</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="thresh"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-total_spend">Total spending</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="total_spend"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-balance">Balance</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="balance"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-created">Created</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="created"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-next_bill_date">Invoice date</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="next_bill_date"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-type">Account Type</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="type"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-status">Account Status</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="status"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-hide_admin">Hidden admin</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="hide_admin"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-timezone">Timezone</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="timezone"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-screenshot_time">Capture time</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="screenshot_time"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-bank_card">Payment card</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="bank_card"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-bm_name">BM name</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="bm_name"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-left item-role">Role</div>
          <div class="item-toggle form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckDefault"
              class="form-check-input item-toggle-input"
              value="role"
            />
          </div>
        </div>
        <div class="item" style="border: none">
          <div class="item-left item-convert_money">
            Automatic currency conversion
          </div>
          <div style="position: relative; font-size: 13px">
            <select
              class="stat-value d-flex align-items-center"
              style="width: 70px"
            >
              <option value="no">No</option>
              <option value="vnd">VND</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div
      class="item"
      style="border: none; font-family: Bold; opacity: 0.7; margin-top: 5px"
    >
      Personal signature
    </div>
    <div class="quillWrapper editor">
      <QuillEditor :options="qillOptions" v-model:content="quillContent" contentType="html" theme="snow" />
    </div>
    <div class="d-between" style="margin-top: 10px">
      <div class="d-flex align-items-center gap-2">
        <div style="color: rgb(0, 0, 0)">Choose table color</div>
        <div
          class="color-item d-flex"
          style="background: rgb(245, 245, 245)"
        ></div>
        <div
          class="color-item d-flex active"
          style="background: rgb(28, 166, 77)"
        >
          <i
            class="bi bi-check-lg"
            style="font-size: 9px; margin: auto; color: rgb(255, 255, 255)"
          ></i>
        </div>
      </div>
      <button class="save-btn" @click="saveData">Save</button>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  data(){
    return {
      qillOptions:{
        modules: {
          toolbar: [['bold', 'italic', 'underline'], [{ 'color': [] }, { 'background': [] }]]
        },
      },
      quillContent: '',
    }
  },
  beforeMount(){
    this.quillContent = `<span>Download tại: <strong style="color: rgb(0, 102, 204);">smit.vn</strong></span><span>mã giới thiệu: <strong style="color: rgb(230, 0, 0)";>mrxuanphan</strong></span>`
  },
  methods:{
    saveData(){
      //console.log("quillContent = ", this.quillContent)
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  gap: 9px;
  .top-icon {
    width: 43px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bs-wrapper);
    padding: 9px;
    border-radius: 8px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
  }
}
.setting-box {
  box-shadow: 0 7px 13px rgba(0, 0, 0, 0.03);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.09);
  background: hsla(0, 0%, 100%, 0.74);
  padding: 6px 17px;
  border-radius: 4px;
  margin-top: 10px;
}
.item {
  font-family: Medium;
  font-size: 12px;
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  &:nth-child(odd) {
    width: 53%;
    .item-left {
      display: flex;
      align-items: center;
    }
  }
  .form-check {
    min-height: 1.3rem;
    margin-bottom: 0;
  }
  .form-switch {
    padding-left: 2.5em;
  }
  .form-check {
    display: block;
    .form-check-input {
      padding: 7px;
      cursor: pointer;
      width: 2em;
      margin-left: -2.5em;
      border-radius: 2em;
      transition: background-position 0.15s ease-in-out;
      &:checked {
        background-color: #35c759;
        border-color: #35c759;
      }
      &:focus {
        box-shadow: unset;
      }
    }
  }
}
.gap-2 {
  gap: 0.5rem !important;
}
.save-btn {
  height: 42px;
  padding: 0 30px;
  font-family: Bold;
  color: #fff;
  float: right;
  font-size: 15px;
  background: linear-gradient(180deg,
          var(--bs-bg-btn-menu1),
          var(--bs-bg-btn-menu2));
  border: 1px solid #fafffc;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(17px);
  transition: all 0.2s;
  border-radius: 10px;
}
.stat-value {
  cursor: pointer;
  margin-right: 4px;
  background: #f5f5f5;
  border: 0.5px solid #e6e6e6;
  box-shadow: 26px 4px 15px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  padding: 2px 6px;
}
.align-items-center {
  align-items: center !important;
}
.color-item {
  position: relative;
  cursor: pointer;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 1px solid #fff;
  &.active {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.quillWrapper .ql-snow.ql-toolbar {
  padding-top: 8px;
  padding-bottom: 4px;
}
:deep(.ql-toolbar){
  border-radius: 8px 8px 0 0;
  height: 30px;
  display: flex;
  align-items: center;
}
:deep(.ql-container){
  max-height: 100px;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  .ql-editor{
    min-height: 200px;
  font-size: 16px;
  }
}
</style>