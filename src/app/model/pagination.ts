let pagination = 1
let isHasMoreData = true

function updatePagination() {
  if (isHasMoreData) {
    pagination += 1
  }
}

function resetPagination() {
  pagination = 1
}


function setIsHasMoreData(check:boolean) {
  isHasMoreData = check
}

interface Gif {
  media: Array<any>;
}
export { pagination, updatePagination, setIsHasMoreData, resetPagination ,isHasMoreData, Gif };
