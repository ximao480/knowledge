<template>
  <div class="navigation">
    <div class="content">
      <div></div>
      <div class="right">
        <div class="search">
          <Input placeholder="搜索知识页、知识本、知识库" style="width: 260px">
            <Icon type="ios-search" slot="prefix" />
          </Input>
        </div>
        <div class="help">
          <Poptip trigger="hover" content="content" placement="bottom-end">
            <i class="iconfont iconios-help-circle-outline"></i>

            <div slot="content">
              <ul>
                <li>
                  <i class="iconfont iconbj_calendar"></i>
                  <span>更新日志</span>
                </li>
              </ul>
            </div>
          </Poptip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
