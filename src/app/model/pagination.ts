let pagination = 1
let isHasMoreData = true

function updatePagination() {
  if (isHasMoreData) {
    pagination += 1
  }
}

function setIsHasMoreData(check:boolean) {
  isHasMoreData = check
}

export { pagination, updatePagination, setIsHasMoreData, isHasMoreData };
