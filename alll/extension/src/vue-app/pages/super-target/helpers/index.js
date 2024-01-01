export const makeSuperTargetTableData = (listData, dataSaved) => {
    return listData.map((item, itemIdx) => ({
        ...item,
        no: itemIdx + 1,
        check: checkExistItem(item),
    }))

    function checkExistItem(itemSelected) {
        return dataSaved.find(item => item.id === itemSelected.id);
    }
}