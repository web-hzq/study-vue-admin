<template>
  <div id="borrow">
    <div id="Main">
      <div class="tupu" id="tupu">
        <div class="tupu-toolbar">
          <ul>
            <li id="zoomOut"><span class="big"></span>放大</li>
            <li id="zoomIn"><span class="small"></span>缩小</li>
            <li id="reset"><span class="refresh"></span>重置</li>
            <li @click="toggleFullScreen($event)">
              <span class="screen"></span>
              {{ isFullscreen ? "全屏" : "退出" }}
            </li>
            <li id="TrSave" @click="downloadImpByChart('股权穿透图')">
              <span class="save"></span>保存
            </li>
          </ul>
        </div>
        <div id="mountNode"></div>
      </div>
    </div>
    <div class="back" @click="onJumpReport">
      <!-- <img src="~@/assets/relation/back.svg" alt /> -->
      {{ companyName }}
    </div>
    <div class="back2 back" @click="onJumpReport">
      <!-- <img src="~@/assets/relation/back.svg" alt /> -->返回
    </div>
  </div>
</template>
<script>
import D3Mixin from "./d3Mixin"; // 引入mixin文件
export default {
  components: {},
  //   mixins: [D3Mixin],
  name: "relation2",
  data() {
    return {
      companyName: this.$route.query.companyName,
      isFullscreen: true,
      rootData: {
        downward: {
          direction: "down",
          name: "origin",
          children: [
            {
              name: "...有限公司",
              amount: "100",
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              isExpand: false,
              type: 2,
              hasNode: 1,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
              ],
            },
            {
              name: "...有限公司11",
              amount: "100",
              isHoldingCompany: true,
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              isExpand: false,
              type: 2,
              hasNode: 1,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
              ],
            },
            {
              name: "...有限公司",
              amount: "100",
              isHoldingCompany: true,
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              isExpand: false,
              type: 2,
              hasNode: 1,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
              ],
            },
            {
              name: "...有限公司",
              hasHumanholding: false,
              hasChildren: true,
              amount: "100",
              ratio: "55%",
              type: 2,
              children: [],
            },
            {
              name: "...有限公司",
              hasHumanholding: false,
              hasChildren: true,
              isExpand: false,
              amount: "100",
              ratio: "55%",
              type: 2,
              hasNode: 1,
              children: [
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  type: 2,
                  children: [],
                },
              ],
            },
          ],
        },
        upward: {
          direction: "up",
          name: "origin",
          children: [
            {
              name: "...(有限合伙)",
              hasHumanholding: false,
              amount: "100",
              isHoldingCompany: true,
              ratio: "55%",
              type: 2,
            },
            {
              name: "...(有限合伙)",
              hasHumanholding: false,
              amount: "100",
              isHoldingCompany: true,
              ratio: "55%",
              type: 2,
              hasNode: 1,
              children: [
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 1,
                  children: [],
                  isFHolder: true,
                  holderPercent: "5%",
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  isExpand: false,
                  amount: "100",
                  isHoldingCompany: true,
                  ratio: "55%",
                  type: 2,
                  hasNode: 1,
                  children: [
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      isHoldingCompany: true,
                      ratio: "55%",
                      type: 1,
                      isFHolder: true,
                      isActualController: true,
                      holderPercent: "95%",
                      children: [],
                    },
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      ratio: "55%",
                      type: 2,
                      children: [],
                    },
                  ],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  type: 1,
                  children: [],
                },
              ],
            },
          ],
        },
      },
      rootName: "...有限公司",
      // beijingCrid: '98682337095518809'
      beijingCrid: this.$route.query.companyId
        ? decodeURIComponent(this.$route.query.companyId)
        : "98682337095519887",
    };
  },
  created() {},
  mounted() {
    this.getInitData();
    // this.drawing()
    window.addEventListener("resize", function () {
      const svg = document.getElementById("svg");
      svg.setAttribute("height", window.innerHeight);
    });
  },
  methods: {
    getInitData() {
      //   gqctt({
      //     beijingCrid: this.beijingCrid,
      //     direction: "",
      //   }).then((res) => {
      // if (res.code === 0) {
      //   this.rootData.upward.children = res.result.investorList;
      //   this.rootData.downward.children = res.result.holderList;
      this.rootData.upward.children.map((item) => {
        item.amount = Number(item.subConAm).toFixed(2);

        // item.ratio =
        //   item.subComBl.length > 6
        //     ? calculation.accMul(item.subComBl, 100).toFixed(2) + "%"
        //     : calculation.accMul(item.subComBl, 100) + "%";

        item.name = item.entName;
        item.type = item.bz === "企业" ? 2 : 1;
        item.isHoldingCompany = item.isHolding == 1 ? true : false;
        item.isFHolder = item.subComBl >= 0.25 && item.type == 1;
        item.holderPercent = item.ratio;
        item.direction = "up";
      });
      this.rootData.downward.children.map((item) => {
        item.amount = Number(item.subConAm).toFixed(2);

        // item.ratio =
        //   item.subComBl.length > 6
        //     ? calculation.accMul(item.subComBl, 100).toFixed(2) + "%"
        //     : calculation.accMul(item.subComBl, 100) + "%";

        item.name = item.pentName;
        item.type = item.bz === "企业" ? 2 : 1;
        item.direction = "down";
      });
      //   this.rootName = res.result.name;
      this.drawing();
      console.log(this.rootData);
      // }
      //   });
    },
    // addChildren(obj, beijingCrid, direction, cb) {
    //   gqctt({
    //     beijingCrid: beijingCrid,
    //     direction: direction,
    //   }).then((res) => {
    //     if (res.code === 0) {
    //       if (direction == "up") {
    //         obj.children = res.result.investorList;
    //         obj.children.map((item) => {
    //           item.amount = Number(item.subConAm).toFixed(2);
    //           item.isFHolder = true;

    //           item.ratio =
    //             item.subComBl.length > 6
    //               ? calculation.accMul(item.subComBl, 100).toFixed(2) + "%"
    //               : calculation.accMul(item.subComBl, 100) + "%";

    //           item.name = item.entName;
    //           item.type = item.bz === "企业" ? 2 : 1;
    //           item.isHoldingCompany = item.isHolding == 1 ? true : false;
    //           item.isFHolder = item.subComBl >= 0.25 && item.type == 1;
    //           item.direction = direction;
    //           item.holderPercent = item.ratio;
    //         });
    //       } else {
    //         obj.children = res.result.holderList;
    //         obj.children.map((item) => {
    //           item.amount = Number(item.subConAm).toFixed(2);
    //           item.isFHolder = true;

    //           item.ratio =
    //             item.subComBl.length > 6
    //               ? calculation.accMul(item.subComBl, 100).toFixed(2) + "%"
    //               : calculation.accMul(item.subComBl, 100) + "%";

    //           item.name = item.pentName;
    //           item.type = item.bz === "企业" ? 2 : 1;
    //           item.isHoldingCompany = item.isHolding == 1 ? true : false;
    //           item.isFHolder = item.subComBl >= 0.25 && item.type == 1;
    //           item.direction = direction;
    //           item.holderPercent = item.ratio;
    //         });
    //       }

    //       cb();
    //     }
    //   });
    // },
    drawing() {
      const width = document.getElementById("mountNode").scrollWidth;
      const height = document.getElementById("mountNode").scrollHeight || 600;
      const strokeColor = {
        isActualController: "#FBC6C3",
        isFHolder: "#F3DDB6",
        person: "#0084FF",
        default: "#CCC",
      };
      const lineColor = {
        isActualController: "#FA6B64",
        isFHolder: "#F1B03A",
        person: "#0084FF",
        default: "#919191",
      };
      const fillColor = {
        isActualController: "#FFFBFB",
        isFHolder: "#FEFBF3",
        person: "#F5FAFF",
        default: "#FFF",
      };
      var _this = this;
      // var rootName = ''; //根节点的名字
      var rootRectWidth = 0; //根节点rect的宽度
      var downwardLength = 0,
        upwardLength = 0;
      var forUpward = true;
      //   var d3 = "";
      var treeChart = function (d3Object) {
        this.d3 = d3Object;
        this.directions = ["upward", "downward"];
      };

      treeChart.prototype.drawChart = function () {
        // First get tree data for both directions.
        this.treeData = {};
        var self = this;
        self.directions.forEach(function (direction) {
          self.treeData[direction] = _this.rootData[direction];
        });
        // rootName = '上海冰鉴信息科技有限公司';
        rootRectWidth = _this.rootName.length * 15 + 60;
        //获得upward第一级节点的个数
        upwardLength = _this.rootData.upward.children.length;
        //获得downward第一级节点的个数
        downwardLength = _this.rootData.downward.children.length;
        self.graphTree(self.getTreeConfig());
      };
      treeChart.prototype.getTreeConfig = function () {
        var treeConfig = {
          margin: {
            top: 10,
            right: 5,
            bottom: 0,
            left: 30,
          },
        };
        treeConfig.chartWidth =
          width - treeConfig.margin.right - treeConfig.margin.left;
        treeConfig.chartHeight =
          height - treeConfig.margin.top - treeConfig.margin.bottom;
        treeConfig.centralHeight = treeConfig.chartHeight / 2;
        treeConfig.centralWidth = treeConfig.chartWidth / 2;
        treeConfig.linkLength = 160;
        treeConfig.duration = 500; //动画时间
        return treeConfig;
      };
      treeChart.prototype.graphTree = function (config) {
        var self = this;
        var d3 = this.d3;
        var linkLength = config.linkLength;
        var duration = config.duration;
        var hasChildNodeArr = [];
        var id = 0;
        var diagonal = function (obj) {
          //折线

          var s = obj.source;
          var t = obj.target;
          let multiplier = s.x > t.x ? -1 : s.x < t.x ? 1 : 0;
          let path =
            s.y > t.y ? s.y / 3 + (t.y * 2) / 3 : s.y / 3 + (t.y * 2) / 3 + 15;
          return (
            "M" +
            s.x +
            "," +
            (s.y + 12) +
            "L" +
            s.x +
            "," +
            path +
            "L" +
            t.x +
            "," +
            path +
            // pathA+
            "L" +
            t.x +
            "," +
            t.y
          );
        };
        var zoom = d3.behavior.zoom().scaleExtent([0.5, 2]).on("zoom", redraw);

        var svg = d3
          .select("#mountNode")
          .append("svg")
          .attr("id", "svg")
          .attr(
            "width",
            config.chartWidth + config.margin.right + config.margin.left
          )
          .attr(
            "height",
            config.chartHeight + config.margin.top + config.margin.bottom
          )
          .attr("xmlns", "http://www.w3.org/2000/svg")
          .on("mousedown", disableRightClick)
          .call(zoom)
          .on("dblclick.zoom", null);
        var treeG = svg
          .append("g")
          .attr("class", "gbox")
          .attr(
            "transform",
            "translate(" + config.margin.left + "," + config.margin.top + ")"
          );

        d3.select("#reset").on("click", function (d) {
          interpolateZoom([0, 0], 1);
        });
        function interpolateZoom(translate, scale) {
          var self = this;
          return d3
            .transition()
            .duration(350)
            .tween("zoom", function () {
              var iTranslate = d3.interpolate(zoom.translate(), translate),
                iScale = d3.interpolate(zoom.scale(), scale);
              return function (t) {
                zoom.scale(iScale(t)).translate(iTranslate(t));
                redraw();
              };
            });
        }

        function zoomClick() {
          var clicked = d3.event.target,
            direction = 1,
            factor = 0.2,
            target_zoom = 1,
            center = [width / 2, height / 2],
            extent = zoom.scaleExtent(),
            translate = zoom.translate(),
            translate0 = [],
            l = [],
            view = { x: translate[0], y: translate[1], k: zoom.scale() };

          d3.event.preventDefault();
          direction = this.id === "zoomOut" ? 1 : -1;

          target_zoom = Number(zoom.scale() + factor * direction).toFixed(1);

          if (target_zoom === extent[0] || target_zoom === extent[1]) {
            return false;
          }
          if (target_zoom < extent[0]) {
            target_zoom = extent[0];
          }
          if (target_zoom > extent[1]) {
            target_zoom = extent[1];
          }
          translate0 = [
            (center[0] - view.x) / view.k,
            (center[1] - view.y) / view.k,
          ];
          view.k = target_zoom;
          l = [
            translate0[0] * view.k + view.x,
            translate0[1] * view.k + view.y,
          ];

          view.x += center[0] - l[0];
          view.y += center[1] - l[1];

          interpolateZoom([view.x, view.y], view.k);
        }
        d3.select("#zoomIn").on("click", zoomClick);
        d3.select("#zoomOut").on("click", zoomClick);
        for (var d in this.directions) {
          var direction = this.directions[d];
          var data = self.treeData[direction];
          data.x0 = config.centralWidth;
          data.y0 = config.centralHeight;
          data.children.forEach(collapse);
          update(data, data, treeG);
        }

        function update(source, originalData, g) {
          var direction = originalData["direction"];
          forUpward = direction == "up";
          var node_class = direction + "Node";
          var link_class = direction + "Link";
          var downwardSign = forUpward ? -1 : 1;
          var nodeColor = forUpward ? "#37592b" : "#8b4513";

          var isExpand = false;
          var statusUp = true;
          var statusDown = true;
          var nodeSpace = 210;
          var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
          var nodes = tree.nodes(originalData);
          var links = tree.links(nodes);
          var offsetX = -config.centralWidth;
          nodes.forEach(function (d) {
            d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
            d.x = d.x - offsetX;
            if (d.name == "origin") {
              d.x = config.centralWidth;
              d.y += downwardSign * 0; // 上下两树图根节点之间的距离
            }
          });

          var node = g.selectAll("g." + node_class).data(nodes, function (d) {
            return d.id || (d.id = ++id);
          });
          var nodeEnter = node
            .enter()
            .append("g")
            .attr("class", node_class)
            .attr("transform", function (d) {
              return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .style("cursor", function (d) {
              return d.name == "origin"
                ? ""
                : d.children || d._children
                ? "pointer"
                : "";
            })
            .on("click", (d) => {
              if (d.type == 2) {
                if (
                  (d.direction == "up" && d.beijingCrid) ||
                  (d.direction == "down" && d.pbeijingCrid)
                ) {
                  _this.$router.push({
                    path: "/search/detail",
                    name: "search-detail",
                    query: {
                      companyId:
                        d.direction == "up" ? d.beijingCrid : d.pbeijingCrid,
                    },
                  });
                }
              }
            })
            .on("mouseover", (d) => {
              if (d.name === "origin") {
                return false;
              }
              let hoverLinkArr = [d.id];
              let sColor = strokeColor.default;
              let lColor = lineColor.default;
              if (d.isActualController) {
                sColor = strokeColor.isActualController;
                lColor = lineColor.isActualController;
              } else if (d.isFHolder) {
                sColor = strokeColor.isFHolder;
                lColor = lineColor.isFHolder;
              } else {
                sColor = strokeColor.person;
                lColor = lineColor.person;
              }
              getRelationLink(d.id, lColor);
              d3.selectAll("marker#resolved" + d.id)
                .selectAll("path")
                .attr("fill", lColor);
              let link;
              if (d.direction == "up") {
                link = d3.selectAll(".upLink");
              } else {
                link = d3.selectAll(".downLink");
              }
              link.sort(function (a, b) {
                if (a.target.id === d.id) {
                  return 1;
                } else {
                  return -1;
                }
              });
              rect
                .style("stroke-width", function (r) {
                  if (r.id === d.id) {
                    return "2";
                  }
                })
                .style("stroke", function (r) {
                  if (r.id === d.id) {
                    if (r.type == 2) {
                      return "#0084FF";
                    } else {
                      if (r.type == 1) {
                        if (r.isActualController) {
                          return "#FA6B64";
                        } else if (r.isFHolder) {
                          return "#F1B03A";
                        } else {
                          return "#0084FF";
                        }
                      } else {
                        return "#CCC";
                      }
                    }
                  } else {
                    if (r.type == 1) {
                      if (r.isActualController) {
                        return "#FBC6C3";
                      } else if (r.isFHolder) {
                        return "#F3DDB6";
                      } else {
                        return "#83C6FF";
                      }
                    } else if (r.name === "origin") {
                      return "#0E78DB";
                    } else {
                      return "#CCC";
                    }
                  }
                });
            })
            .on("mouseout", (d) => {
              if (d.name === "origin") {
                return false;
              }
              d3.selectAll("marker#resolved" + d.id)
                .selectAll("path")
                .attr("fill", lineColor.default);
              link
                .style("stroke", function (l) {
                  return "#919191";
                })
                .style("stroke-width", function (l) {
                  return 1;
                });
              rect
                .style("stroke-width", function (r) {
                  if (r.id === d.id) {
                    return "1";
                  }
                })
                .style("stroke", function (r) {
                  if (r.type == 1) {
                    if (r.isActualController) {
                      return "#FBC6C3";
                    } else if (r.isFHolder) {
                      return "#F3DDB6";
                    } else {
                      return "#83C6FF";
                    }
                  } else if (r.name === "origin") {
                    return "#0E78DB";
                  } else {
                    return "#CCC";
                  }
                });
            });
          function getRelationLink(id, color) {
            if (id == 1) {
              return false;
            }
            let sourceId = "";
            link
              .style("stroke", function (l) {
                if (id === l.target.id) {
                  sourceId = l.source.id;
                  return color;
                }
              })
              .style("stroke-width", function (l) {
                if (id === l.target.id) {
                  return 2;
                }
              });
          }
          const rect = nodeEnter
            .append("svg:rect")
            .attr("x", function (d) {
              return d.name == "origin" ? -(rootRectWidth / 2) : -100;
            })
            .attr("y", function (d) {
              return d.name == "origin" ? -20 : forUpward ? -52 : 12;
            })
            .attr("width", function (d) {
              return d.name == "origin" ? rootRectWidth : 200;
            })
            .attr("height", function (d) {
              return d.name == "origin" ? 40 : 80;
            })
            .attr("rx", 0)
            .style("cursor", "pointer")
            .style("stroke", function (d) {
              if (d.name == "origin") {
                return "#0E78DB";
              } else if (d.type == 1) {
                if (d.isActualController) {
                  return "#FBC6C3";
                } else if (d.isFHolder) {
                  return "#F3DDB6";
                } else {
                  return "#83C6FF";
                }
              } else {
                return "#CCC";
              }
            })
            .style("fill", function (d) {
              if (d.name == "origin") {
                return "#0084FF";
              } else if (d.type == 1) {
                if (d.isActualController) {
                  return "#FFFBFB";
                } else if (d.isFHolder) {
                  return "#FEFBF3";
                } else {
                  return "#F5FAFF";
                }
              } else {
                return "#fff";
              }
            });

          const personTopRect = nodeEnter
            .append("svg:rect")
            .attr("x", function (d) {
              return -100;
            })
            .attr("y", function (d) {
              return !d.isFHolder ? 0 : d.isActualController ? -102 : -82;
            })
            .attr("width", function (d) {
              return d.isFHolder ? 200 : 0;
            })
            .attr("height", function (d) {
              return !d.isFHolder ? 0 : d.isActualController ? 50 : 30;
            })
            .attr("rx", 2)
            .style("stroke", function (d) {
              return d.isActualController ? "#FA6B64" : "#F1B03A";
            })
            .style("fill", function (d) {
              return d.isActualController ? "#FA6B64" : "#F1B03A"; //节点背景色
            });
          nodeEnter
            .append("svg:path")
            .attr("fill", (d) => {
              return d.isActualController ? "#FA6B64" : "#F1B03A";
            })
            .attr("d", function (d) {
              if (d.isFHolder) {
                return "M0 -44 L-10 -54 L10 -54 Z";
              } else {
                return "";
              }
            });
          const holdingCompanyRect = nodeEnter
            .append("svg:rect")
            .attr("x", "-40")
            .attr("y", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "31" : "-9";
            })
            .attr("rx", 2)
            .attr("width", function (d) {
              return d.isHoldingCompany ? 30 : 0;
            })
            .attr("height", function (d) {
              return d.isHoldingCompany ? 20 : 0;
            })
            .style("fill", "#EBF5FF");
          nodeEnter
            .append("text")
            .attr("x", "-35")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "45" : "5";
            })
            .attr("text-anchor", "start")
            .style("fill", "#0084FF")
            .style("font-size", 10)
            .text(function (d) {
              return d.isHoldingCompany ? "控股" : "";
            });
          nodeEnter.append("circle").attr("r", 1e-6);
          nodeEnter
            .append("text")
            .attr("x", function (d) {
              return "0";
            })
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "-24" : "40";
            })
            .attr("text-anchor", function (d) {
              return "middle";
            })
            .text(function (d) {
              if (d.name == "origin") {
                return _this.rootName;
              }
              if (d.repeated) {
                return "[Recurring] " + d.name;
              }
              return d.name.length > 12 ? d.name.substr(0, 12) : d.name;
            })
            .style({
              fill: function (d) {
                if (d.name == "origin") {
                  return "#fff";
                } else {
                  return "#333";
                }
              },
              "font-size": function (d) {
                return d.name == "origin" ? 16 : 14;
              },
              cursor: "pointer",
            })
            .on("click", Change_modal)
            .append("svg:title")
            .text((d) => d.name);
          nodeEnter
            .append("text")
            .attr("x", "0")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "-5" : "59";
            })
            .attr("text-anchor", function () {
              return "middle";
            })
            .attr("fill", "#333")
            .text(function (d) {
              return d.name.length > 24
                ? d.name.substr(12, 12) + "..."
                : d.name.substr(12, d.name.length);
            })
            .style({
              "font-size": function (d) {
                return d.name == "origin" ? 16 : 14;
              },
              cursor: "pointer",
            })
            .append("svg:title")
            .text((d) => d.name);

          nodeEnter
            .append("text")
            .attr("x", "0")
            .attr("dy", function (d) {
              if (d.name === "origin") {
                return ".35em";
              } else {
                if (forUpward) {
                  if (d.name.length > 12) {
                    return "16";
                  } else {
                    return "6";
                  }
                } else {
                  if (d.name.length > 12) {
                    return "80";
                  } else {
                    return "70";
                  }
                }
              }
            })
            .attr("text-anchor", "middle")
            .attr("class", "linkname")
            .style("fill", "#666")
            .style("cursor", "pointer")
            .style("font-size", 12)
            .text(function (d) {
              var str =
                d.name == "origin" ? "" : "认缴金额：" + d.amount + "万人民币";
              return str.length > 18 ? str.substr(0, 18) + ".." : str;
            });
          nodeEnter
            .append("text")
            .attr("x", "10")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "45" : "5";
            })
            .attr("text-anchor", "start")
            .attr("class", "linkname")
            .style("fill", "#0084FF")
            .style("font-size", 10)
            .text(function (d) {
              return d.name == "origin" ? "" : d.ratio;
            });
          nodeEnter
            .append("text")
            .attr("x", "0")
            .attr("dy", function (d) {
              return d.isActualController ? -87 : -72;
            })
            .attr("text-anchor", "middle")
            .style("fill", "#fff")
            .style("font-size", 12)
            .text(function (d) {
              return d.isActualController ? "疑似实际控制人" : "";
            });
          nodeEnter
            .append("text")
            .attr("x", "0")
            .attr("dy", function (d) {
              return d.isActualController ? -65 : -63;
            })
            .attr("text-anchor", "middle")
            .style("fill", "#fff")
            .style("font-size", 12)
            .text(function (d) {
              return d.isFHolder ? "最终受益人：" + d.holderPercent : "";
            });
          var nodeUpdate = node
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });
          nodeUpdate
            .select("circle")
            .attr("r", function (d) {
              return d.hasNode == 1 ? 10 : 0;
            })
            .attr("cy", function (d) {
              return d.name == "origin" ? -20 : forUpward ? -63 : 103;
            })
            .style("fill", function (d) {
              return d.hasNode == 1 ? "#9CD0FF" : "";
            })
            .style("stroke", function (d) {
              return d.hasNode == 1 ? "#9CD0FF" : "";
            })
            .style("stroke-width", function (d) {
              if (d.repeated) {
                return 5;
              }
            });
          //代表是否展开的+-号
          nodeEnter
            .append("svg:text")
            .attr("class", "isExpand")
            .attr("x", "0")
            .attr("dy", function (d) {
              return forUpward ? -57 : 109;
            })
            .attr("text-anchor", "middle")
            .style("fill", "#fff")
            .style("font-size", "20px")
            .style("cursor", "pointer")
            .text(function (d) {
              if (d.name == "origin") {
                return "";
              }
              return d.hasNode == 1 ? "+" : "";
            })
            .on("click", click);

          nodeUpdate.select("text").style("fill-opacity", 1);

          var nodeExit = node
            .exit()
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();
          nodeExit.select("circle").attr("r", 1e-6);
          nodeExit.select("text").style("fill-opacity", 1e-6);

          var link = g
            .selectAll("path." + link_class)
            .data(links, function (d) {
              return d.target.id;
            });

          link
            .enter()
            .insert("path", "g")
            .attr("class", link_class)
            .attr("stroke", function (d) {
              // return '#8b4513'
              return "#919191";
            })
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            // .attr('opacity', 0.5)
            .attr("d", function (d) {
              var o = {
                x: source.x0,
                y: source.y0,
              };
              return diagonal({
                source: o,
                target: o,
              });
            })
            .attr("marker-end", function (d, i) {
              return forUpward
                ? getMarkerUpArrow(d, i)
                : getMarkerDownArrow(d, i);
            })
            .attr("id", function (d, i) {
              return "mypath" + "-" + d.source.id + "-" + d.target.id;
            });
          link.transition().duration(duration).attr("d", diagonal);
          link
            .exit()
            .transition()
            .duration(duration)
            .attr("d", function (d) {
              var o = {
                x: source.x,
                y: source.y,
              };
              return diagonal({
                source: o,
                target: o,
              });
            })
            .remove();
          nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
          function getMarkerUpArrow(d, i) {
            svg
              .append("defs")
              .append("marker") //箭头
              .attr("id", "resolved" + d.target.id)
              .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
              .attr("markerUnits", "userSpaceOnUse")
              .attr("viewBox", "0 -5 10 10") //坐标系的区域
              .attr("refX", -28) //箭头坐标
              .attr("refY", 0)
              .attr("markerWidth", 12) //标识的大小
              .attr("markerHeight", 12)
              .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
              .attr("stroke-width", 2) //箭头宽度
              .append("path")
              .attr("d", "M0,-5L10,0L0,5") //箭头的路径
              .attr("fill", "#919191"); //箭头颜色
            return "url(#resolved" + d.target.id + ")";
          }
          function getMarkerDownArrow(d, i) {
            svg
              .append("defs")
              .append("marker") //箭头
              .attr("id", "resolved" + d.target.id)
              .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
              .attr("markerUnits", "userSpaceOnUse")
              .attr("viewBox", "0 -5 10 10") //坐标系的区域
              .attr("refX", 0) //箭头坐标
              .attr("refY", 0)
              .attr("markerWidth", 12) //标识的大小
              .attr("markerHeight", 12)
              .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
              .attr("stroke-width", 2) //箭头宽度
              .append("path")
              .attr("d", "M0,-5L10,0L0,5") //箭头的路径
              .attr("fill", "#919191");
            return "url(#resolved" + d.target.id + ")";
          }
          function Change_modal() {
            _this.Modal = true;
          }
          function click(d) {
            event.stopPropagation();
            if (forUpward) {
            } else {
              if (d._children) {
                console.log("对外投资--ok");
              } else {
                console.log("对外投资--no");
              }
            }
            isExpand = !isExpand;
            if (d.name == "origin") {
              return;
            }
            if (d.children) {
              d._children = d.children;
              d.children = null;
              d3.select(this).text("+");
              update(d, originalData, g);
            } else {
              if (d._children && d._children.length > 0) {
                d.children = d._children;
                d._children = null;
                if (d.name == "origin") {
                  d.children.forEach(expand);
                }
                d3.select(this).text("-");
                update(d, originalData, g);
              } else {
                gqctt({
                  beijingCrid:
                    d.direction == "up" ? d.beijingCrid : d.pbeijingCrid,
                  direction: d.direction,
                }).then((res) => {
                  if (res.code === 0) {
                    if (d.direction == "up") {
                      d.children = res.result.investorList;
                      d.children.map((item) => {
                        item.amount = Number(item.subConAm).toFixed(2);
                        item.isFHolder = true;
                        item.ratio =
                          item.subComBl.length > 6
                            ? calculation
                                .accMul(item.subComBl, 100)
                                .toFixed(2) + "%"
                            : calculation.accMul(item.subComBl, 100) + "%";
                        item.name = item.entName;
                        item.type = item.bz === "企业" ? 2 : 1;
                        item.isHoldingCompany =
                          item.isHolding == 1 ? true : false;
                        item.isFHolder =
                          item.subComBl >= 0.25 && item.type == 1;
                        item.direction = direction;
                        item.holderPercent = item.ratio;
                      });
                    } else {
                      d.children = res.result.holderList;
                      d.children.map((item) => {
                        item.amount = Number(item.subConAm).toFixed(2);
                        item.isFHolder = true;
                        // item.ratio =
                        //   item.subComBl.length > 6
                        //     ? calculation
                        //         .accMul(item.subComBl, 100)
                        //         .toFixed(2) + "%"
                        //     : calculation.accMul(item.subComBl, 100) + "%";
                        item.name = item.pentName;
                        item.type = item.bz === "企业" ? 2 : 1;
                        item.isHoldingCompany =
                          item.isHolding == 1 ? true : false;
                        item.isFHolder =
                          item.subComBl >= 0.25 && item.type == 1;
                        item.direction = direction;
                        item.holderPercent = item.ratio;
                      });
                    }
                    d._children = null;
                    if (d.name == "origin") {
                      d.children.forEach(expand);
                    }
                    d3.select(this).text("-");
                    update(d, originalData, g);
                  }
                });
              }
            }
          }
        }
        function expand(d) {
          if (d._children) {
            d.children = d._children;
            d.children.forEach(expand);
            d._children = null;
          }
        }

        function collapse(d) {
          if (d.children && d.children.length != 0) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
            hasChildNodeArr.push(d);
          }
        }

        function redraw() {
          treeG.attr(
            "transform",
            "translate(" +
              zoom.translate() +
              ")" +
              " scale(" +
              zoom.scale() +
              ")"
          );
        }

        function disableRightClick() {
          // stop zoom
          if (d3.event.button == 2) {
            console.log("No right click allowed");
            d3.event.stopImmediatePropagation();
          }
        }

        function sortByDate(a, b) {
          var aNum = a.name.substr(a.name.lastIndexOf("(") + 1, 4);
          var bNum = b.name.substr(b.name.lastIndexOf("(") + 1, 4);
          return (
            d3.ascending(aNum, bNum) ||
            d3.ascending(a.name, b.name) ||
            d3.ascending(a.id, b.id)
          );
        }
        console.log(d3);
        var d3GenerationChart = new treeChart(d3);
        d3GenerationChart.drawChart();
      };
    },
    onJumpReport() {
      // this.$router.push(...)
    },
  },
};
</script>
<style lang="scss" scoped>
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
.borrow {
  height: 1000px;
  position: relative;
  top: -66px;
}
</style>
