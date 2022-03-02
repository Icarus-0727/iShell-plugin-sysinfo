import { NGrid, NGi, NProgress } from "naive-ui";

export default {
  components: {
    NGrid,
    NGi,
    NProgress,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      machineId: getQueryParam("machine_id"),
      cpuUsed: 0,
      memUsed: 0,
      memTotal: 0,
      swapUsed: 0,
      swapTotal: 0,
    };
  },
  methods: {
    getCpuUsed() {
      fetch("http://127.0.0.1:32123/ssh/assist", {
        method: "POST",
        body: JSON.stringify({
          id: 1 * this.machineId,
          cmd: "vmstat",
        }),
      }).then((res) => {
        res.json().then((json) => {
          json = json.data.split("\n")[2].split(" ");
          trim(json, "");
          this.cpuUsed = (100 - json[14]).toFixed(2);
        });
      });
    },
    getMemUsed() {
      fetch("http://127.0.0.1:32123/ssh/assist", {
        method: "POST",
        body: JSON.stringify({
          id: 1 * this.machineId,
          cmd: "free",
        }),
      }).then((res) => {
        res.json().then((json) => {
          json = json.data.split("\n");
          let mem = json[1].split(" ");
          let swap = json[2].split(" ");
          trim(mem, "");
          trim(swap, "");
          console.log(mem, swap);
          this.memTotal = mem[1];
          this.memUsed = mem[2];
          this.swapTotal = swap[1];
          this.swapUsed = swap[2];
        });
      });
    },
  },
  mounted() {
    this.getCpuUsed();
    this.getMemUsed();
    setInterval(() => {
      this.getCpuUsed();
      this.getMemUsed();
    }, 3000);
  },
};

function getQueryParam(name) {
  return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.href) || [, ""])[1].replace(/\+/g, "%20")) || null;
}

function trim(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == target) {
      arr.splice(i, 1);
    }
  }
}
