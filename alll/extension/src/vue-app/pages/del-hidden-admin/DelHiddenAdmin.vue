<template>
  <div class="comp-wrapper">
    <div class="text-h1" style="font-size: 20px">
      Delete hidden admin of acc
    </div>
    <div class="top-comp">
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div
          class="d-row"
          style="
            background: rgb(255, 255, 255);
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 1px;
            padding: 5px;
          "
        >
          <div class="d-row">
            <input
              type="radio"
              name="load_type"
              id="load_all"
              value="all"
              class="form-check-input"
            /><label for="load_all" class="top-box-label">
              Load all
            </label>
          </div>
          <div class="d-row" style="margin-left: 15px">
            <input     
              type="radio"
              name="load_type"
              id="load_id"
              value="id"
              class="form-check-input"
            /><label for="load_id" class="top-box-label">
              Load by acc ID
            </label>
          </div>
        </div>
        <textarea       
          placeholder="Enter the ID you want to load, separated by a newline"
          class="top-box-textarea"
          disabled="disabled"
          style="height: 47px"
        ></textarea>
        <div class="d-between" style="height: 21px">
          <div style="font-size: 9px">
            Delay <br />
            (second)
          </div>
          <input           
            type="text"
            class="form-control text-center"
            style="
              box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 1px;
              font-size: 10px;
              width: 37px;
              height: 100%;
            "
          />
          <div >-</div>
          <input        
            type="text"
            class="form-control text-center"
            style="
              box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 1px;
              font-size: 10px;
              width: 37px;
              height: 100%;
            "
          /><button       
            style="
              background: rgb(27, 155, 72);
              padding: 0px 10px;
              border-radius: 5px;
              color: rgb(255, 255, 255);
              font-size: 11px;
              height: 100%;
              font-family: Bold;
            "
          >
            Load
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="top-log">
          <div class="top-log-header">
            <div >
              <img             
                src="@images/svg25.svg"
                alt=""
                style="transform: translateY(-1px)"
              /><span > Success </span>
            </div>
            <img
              
              src="@images/copy.svg"
              alt=""
              class="btn-hidden"
            />
          </div>
          <div class="top-log-body"></div>
        </div>
        <div class="top-log">
          <div class="top-log-header">
            <div >
              <img
                
                src="@images/svg26.svg"
                alt=""
                style="transform: translateY(-1px)"
              /><span > Fail </span>
            </div>
            <img
              
              src="@images/copy.svg"
              alt=""
              class="btn-hidden"
            />
          </div>
          <div class="top-log-body"></div>
        </div>
      </div>
    </div>
    <div
      
      class="d-between"
      style="height: 25px; margin-top: 10px"
    >
      <div
        
        style="text-transform: uppercase; font-size: 12px; font-family: Medium"
      >
        List of accounts (72)
      </div>
      <div class="d-row" style="height: 100%">
        <input
          
          placeholder="Find acc id or name"
          type="text"
          class="form-control"
          style="font-size: 10px; height: 100%; width: 147px"
        /><button
          
          style="
            font-size: 10px;
            font-family: Bold;
            margin-left: 6px;
            color: rgb(255, 255, 255);
            height: 100%;
            background: rgb(120, 136, 155);
            border-radius: 3px;
            padding: 0px 8px;
          "
          disabled="disabled"
        >
          <img src="@images/svg27.svg" alt="" /><span
            
            style="margin-left: 5px"
          >
            Del hidden admin
          </span>
        </button>
      </div>
    </div>
    <div class="body-comp">
    </div>
    <!----><!----><!---->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text-h1 {
    font-size: 20px;
    font-family: Bold;
}
.top-comp{
    display: flex;
    gap: 10px;
    &>div{
      width: 50%;
    }
}
.d-row {
    display: flex;
    align-items: center;
}
.form-check-input{
  margin-top: 0;
  &:checked{
    background-color: var(--bs-wrapper);
    border-color: var(--bs-wrapper);
  }
}
.top-box-label{
    margin-left: 5px;
    transform: translateY(1px);
}
.top-box-textarea{
    width: 100%;
    background: #fff;
    border: 1px solid #ececec;
    outline: none;
    resize: none;
    padding: 3px 5px;
}
.top-log{
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 5px;
    width: calc(50% - 5px);
    height: 110px;
    .top-log-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px;
    border-bottom: 1px solid #ececec;
    }
    .top-log-body{
    height: calc(100% - 42px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 5px 10px;
}

}
.btn-hidden, button {
    font-family: Bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all .2s;
}
.btn-hidden{
  width:10px; 
  margin-right:5px;
}
.body-comp{
    margin-top: 15px;
    height: 100%;
    overflow: auto;
    background: hsla(0,0%,100%,.7);
    box-shadow: 2px 9px 24px rgba(0,0,0,.05);
    backdrop-filter: blur(46px);
    border-radius: 13px;
    border: 1px solid;
    border-image-source: linear-gradient(180deg,#fff,hsla(0,0%,100%,.33));
}
</style>