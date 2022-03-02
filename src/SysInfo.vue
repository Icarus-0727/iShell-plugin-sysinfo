<template>
  <NGrid
    cols="24"
    style="padding: 0 10px; width: calc(100% - 20px); text-align: center; padding-top: 20px;"
  >
    <NGi span="8">CPU</NGi>
    <NGi span="8">内存</NGi>
    <NGi span="8">交换</NGi>
    <NGi span="8">
      <NProgress
        type="circle"
        :percentage="cpuUsed"
        :height="20"
        :border-radius="4"
        :fill-border-radius="0"
      />
    </NGi>
    <NGi span="8">
      <NProgress
        type="circle"
        :percentage="Math.round(memUsed / memTotal * 100)"
        :height="20"
        :border-radius="4"
        :fill-border-radius="0"
      />
    </NGi>
    <NGi span="8">
      <NProgress
        type="circle"
        :percentage="Math.round(swapUsed / swapTotal * 100)"
        :height="20"
        :border-radius="4"
        :fill-border-radius="0"
      />
    </NGi>
  </NGrid>
</template>

<script src="./SysInfo.js"></script>
