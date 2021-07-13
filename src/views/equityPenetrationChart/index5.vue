<template>
  <div>
    <div class="container" id="treecontainer">
      <div class="menu">
        <div id="product_tree" class="treeWrap"></div>
      </div>
    </div>
  </div>
</template>
<script>
let jQuery = require("./jquery-3.3.1.min.js");
// let d3 = require("./d3.min.js");
import d3 from "./d3.min.js";
// var container;
var zoom;
// var rootData;
// var depthInfo;
var rootName; //根节点名称
export default {
  data() {
    return {
      container: "",
      zoom: "",
      rootData: {},
      depthInfo: "",
      rootName: "",
    };
  },
  methods: {
    getData() {
      // 测试内容
      var rootData = {
        downward: {
          direction: "downward",
          name: "origin",
          children: [
            {
              name: "上海冰鉴企业征信服务有限公司",
              amount: "100",
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              direction: "downward",
              isExpand: false,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
              ],
            },
            {
              name: "上海冰鉴企业征信服务有限公司11",
              amount: "100",
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              direction: "downward",
              isExpand: false,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
              ],
            },
            {
              name: "北京冰鉴企业征信服务有限公司",
              amount: "100",
              ratio: "55%",
              hasHumanholding: true,
              hasChildren: true,
              direction: "downward",
              isExpand: false,
              children: [
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司名字",
                  hasHumanholding: false,
                  hasChildren: true,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
              ],
            },
            {
              name: "成都量化金服大数据技术服务有限公司",
              hasHumanholding: false,
              hasChildren: true,
              direction: "downward",
              amount: "100",
              ratio: "55%",
              children: [],
            },
            {
              name: "南京冰鉴信息科技有限公司",
              hasHumanholding: false,
              hasChildren: true,
              isExpand: false,
              direction: "downward",
              amount: "100",
              ratio: "55%",
              children: [
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
              ],
            },
          ],
        },
        upward: {
          direction: "upward",
          name: "origin",
          children: [
            {
              name: "上海唯猎创业投资中心1(有限合伙)",
              hasHumanholding: false,
              direction: "upward",
              amount: "100",
              ratio: "55%",
              children: [],
            },
            {
              name: "上海唯猎创业投资中心2(有限合伙)",
              hasHumanholding: false,
              amount: "100",
              ratio: "55%",
              direction: "upward",
              children: [],
            },
            {
              name: "上海唯猎创业投资中心3(有限合伙)",
              hasHumanholding: false,
              amount: "100",
              ratio: "55%",
              direction: "upward",
              children: [],
            },
          ],
        },
      };
      rootName = "上海冰鉴信息科技有限公司";
      this.rootData = rootData;
      this.rootName = rootName;
      this.drawing();
    },
    drawing() {
      var _this = this;
      console.log(this);
      console.log(_this);
      // var rootName = ''; //根节点的名字
      var rootRectWidth = 0; //根节点rect的宽度
      var downwardLength = 0,
        upwardLength = 0;
      var forUpward = true;
      var width = document.getElementById("product_tree").scrollWidth;
      var height = document.getElementById("product_tree").scrollHeight || 600;
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
        rootRectWidth = _this.rootName.length * 15;
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
            left: 5,
          },
        };

        treeConfig.chartWidth =
          width - treeConfig.margin.right - treeConfig.margin.left;
        treeConfig.chartHeight =
          height - treeConfig.margin.top - treeConfig.margin.bottom;
        treeConfig.centralHeight = treeConfig.chartHeight / 2;
        treeConfig.centralWidth = treeConfig.chartWidth / 2;
        treeConfig.linkLength = 70; //箭头长度(上下节点距离)
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
        //        var diagonal = d3.svg.diagonal()
        //          .projection(function(d) {
        //            return [d.x, d.y];
        //          });
        var diagonal = function (obj) {
          //折线
          console.log(obj);
          var s = obj.source;
          var t = obj.target;
          if (obj.d) {
            s = obj.d.source;
            t = obj.d.target;
          }

          var endMoveNum = 0;
          var moveDistance = 0;
          if (obj.d) {
            if (obj.d.source.direction == "downward") {
              var downMoveNum = obj.d.source.name == "origin" ? 10 : 30;
              endMoveNum = downMoveNum;
              moveDistance = s.y + (t.y - s.y) / 2 + endMoveNum;
            } else {
              var upMoveNum = obj.d.source.name == "origin" ? -10 : -30;
              endMoveNum = upMoveNum;
              moveDistance = t.y + (s.y - t.y) / 2 + endMoveNum;
            }
          }
          return (
            "M" +
            s.x +
            "," +
            s.y +
            "L" +
            s.x +
            "," +
            moveDistance +
            "L" +
            t.x +
            "," +
            moveDistance +
            "L" +
            t.x +
            "," +
            t.y
          );
        };
        // var diagonal = d3.svg
        //   .diagonal()
        //   .source(function (d) {
        //     return {
        //       x: d.source.x,
        //       y:
        //         d.source.name == "origin"
        //           ? forUpward
        //             ? d.source.y - 20
        //             : d.source.y + 20
        //           : forUpward
        //           ? d.source.y - 60
        //           : d.source.y + 60,
        //     };
        //   })
        //   .target(function (d) {
        //     return {
        //       x: d.target.x,
        //       y: d.target.y,
        //     };
        //   })
        //   .projection(function (d) {
        //     return [d.x, d.y];
        //   });
        // d3.select("#zoomIn")
        //     .on("click", function(d) {
        //         zoom.scaleBy(svg, 0.9); // 执行该方法后 会触发zoom事件
        //         let tran = d3.zoomTransform(svg.node());
        //         // svg.attr("transform", `translate(${tran.x},${tran.y}),scale(${tran.k})`); // 您可以手动地更新
        //         console.log(tran);
        //     });
        var zoom = d3.behavior.zoom().scaleExtent([0.5, 2]).on("zoom", redraw);
        var svg = d3
          .select("#product_tree")
          .append("svg")
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

        //箭头(下半部分)
        var markerDown = svg
          .append("marker")
          .attr("id", "resolvedDown")
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
          .attr("fill", "#006eff"); //箭头颜色
        //箭头(上半部分)
        var markerUp = svg
          .append("marker")
          .attr("id", "resolvedUp")
          .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
          .attr("markerUnits", "userSpaceOnUse")
          .attr("viewBox", "0 -5 10 10") //坐标系的区域
          .attr("refX", 10) //箭头坐标
          .attr("refY", 0)
          .attr("markerWidth", 12) //标识的大小
          .attr("markerHeight", 12)
          .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
          .attr("stroke-width", 2) //箭头宽度
          .append("path")
          .attr("d", "M0,-5L10,0L0,5") //箭头的路径
          .attr("fill", "#006eff"); //箭头颜色

        // Initialize the tree nodes and update chart.
        for (var d in this.directions) {
          var direction = this.directions[d];
          var data = self.treeData[direction];
          data.x0 = config.centralWidth;
          data.y0 = config.centralHeight;
          data.children.forEach(collapse);
          update(data, data, treeG);
        }

        function update(source, originalData, g) {
          console.log(source);
          var direction = originalData["direction"];
          forUpward = direction == "upward";
          var node_class = direction + "Node";
          var link_class = direction + "Link";
          var downwardSign = forUpward ? -1 : 1;
          var nodeColor = forUpward ? "#006eff" : "#8b4513";

          var isExpand = false;
          var statusUp = true;
          var statusDown = true;
          var nodeSpace = 130; //左右节点间距
          var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
          var nodes = tree.nodes(originalData);
          var links = tree.links(nodes);
          var offsetX = -config.centralWidth;
          nodes.forEach(function (d) {
            d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
            d.x = d.x - offsetX;
            console.log(d);
            console.log(forUpward);
            if (d.name == "origin") {
              d.x = config.centralWidth;
              d.y += downwardSign * 0; // 上下两树图根节点之间的距离
            } else if (d.parent.name == "origin") {
              d.y =
                downwardSign * (d.depth * linkLength) +
                config.centralHeight -
                (forUpward ? -15 : 15);//根节点距离子节点的距离
              // d.y += downwardSign * (d.depth * (linkLength-forUpward?-20:20)) + config.centralHeight; // 上下两树图根节点之间的距离
              // if (d.direction == "upward") {
              //   d.y =
              //     downwardSign * (d.depth * linkLength) +
              //     config.centralHeight -
              //     (forUpward ? -20 : -18);
              // } else {
              //   d.y =
              //     downwardSign * (d.depth * linkLength) +
              //     config.centralHeight -
              //     (forUpward ? 20 : 18);
              // }
            } else if (d.depth >= 1) {
              d.y =
                downwardSign * (d.depth * linkLength) +
                config.centralHeight -
                (forUpward ? (d.depth-2) * 18 : -((d.depth - 2) * 18));
            }
            console.log(d.name, "-------------", d.y);
          });

          // Update the node.
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
            .on("click", nodeClick)
            .on("mouseenter", nodeHover)
            .on("mouseleave", nodeOut);
          nodeEnter
            .append("svg:rect")
            .attr("x", function (d) {
              return d.name == "origin" ? -(rootRectWidth / 2) : -60;
            })
            .attr("y", function (d) {
              return d.name == "origin" ? -20 : forUpward ? -52 : 12;
            })
            .attr("width", function (d) {
              return d.name == "origin" ? rootRectWidth : 120;
            })
            .attr("height", 40)
            // .attr("rx", 10)//节点边框圆角
            .style("stroke", function (d) {
              return d.name == "origin" ? "#006eff" : "#006eff"; //节点边框
            })
            .style("fill", function (d) {
              return d.name == "origin" ? "#006eff" : "#FFF"; //节点背景色
            })
            .on("mouseenter", nodeHover);

          nodeEnter
            .append("circle")
            .attr("r", 1e-6)
            .on("mouseenter", nodeOut)
            .on("mouseleave", nodeOut);
          nodeEnter
            .append("text")
            .attr("class", "linkname")
            .attr("x", function (d) {
              return d.name == "origin" ? "0" : "-55";
            })
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "-40" : "24";
            })
            .attr("text-anchor", function (d) {
              return d.name == "origin" ? "middle" : "start";
            })
            .attr("fill", "#000")
            .text(function (d) {
              if (d.name == "origin") {
                // return ((forUpward) ? '根节点TOP' : '根节点Bottom');
                return _this.rootName;
              }
              if (d.repeated) {
                return "[Recurring] " + d.name;
              }
              return d.name.length > 10 ? d.name.substr(0, 10) : d.name;
            })
            .style({
              // 'fill-opacity': 1e-6,
              fill: function (d) {
                if (d.name == "origin") {
                  return "#fff";
                }
              },
              "font-size": function (d) {
                return d.name == "origin" ? 14 : 11;
              },
            });
          // .on("click", Change_modal);

          nodeEnter
            .append("text")
            .attr("class", "linkname")
            .attr("x", "-55")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "-29" : "35";
            })
            .attr("text-anchor", function () {
              return d.name == "origin" ? "middle" : "start"; //字体上下居中？
            })
            .text(function (d) {
              return d.name.substr(10, d.name.length);
            })
            .style({
              // 'fill': "#006eff",第二行字体颜色
              "font-size": function (d) {
                return d.name == "origin" ? 14 : 11;
              },
            });
          // .on('click', Change_modal);

          nodeEnter
            .append("text")
            .attr("x", "-55")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "-16" : "48";
            })
            .attr("text-anchor", "start")
            .attr("class", "linkname")
            .style("fill", "#006eff") //认缴金额字体颜色
            .style("font-size", 10)
            .text(function (d) {
              var str =
                d.name == "origin" ? "" : "认缴金额:" + d.amount + "万人民币";
              return str.length > 13 ? str.substr(0, 13) + ".." : str;
            });
          nodeEnter
            .append("text")
            .attr("x", "10")
            .attr("dy", function (d) {
              return d.name == "origin" ? ".35em" : forUpward ? "0" : "10";
            })
            .attr("text-anchor", "start")
            .attr("class", "linkname")
            .style("fill", "#006eff") //比例颜色（55%）
            .style("font-size", 10)
            .text(function (d) {
              return d.name == "origin" ? "" : d.ratio;
            })
            .on("mouseenter", nodeOut)
            .on("mouseleave", nodeOut);

          // Transition nodes to their new position.原有节点更新到新位置
          var nodeUpdate = node
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });
          nodeUpdate
            .select("circle")
            .attr("r", function (d) {
              return d.name == "origin"
                ? 0
                : hasChildNodeArr.indexOf(d) == -1
                ? 0
                : 6;
            })
            .attr("cy", function (d) {
              return d.name == "origin" ? -20 : forUpward ? -59 : 59;
            })
            .style("fill", function (d) {
              return hasChildNodeArr.indexOf(d) != -1 ? "#fff" : ""; //展开按钮背景颜色
              // if (d._children || d.children) { return "#fff"; } else { return "rgba(0,0,0,0)"; }
            })
            .style("stroke", function (d) {
              return hasChildNodeArr.indexOf(d) != -1 ? "#006eff" : ""; //展开按钮边框颜色
              // if (d._children || d.children) { return "#8b4513"; } else { return "rgba(0,0,0,0)"; }
            })
            // .style('fill-opacity', function(d) {
            //     if (d.children) {
            //         return 0.35;
            //     }
            // })
            // Setting summary node style as class as mass style setting is
            // not compatible to circles.
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
              return forUpward ? -58.5 : 59.5;
            })
            .attr("text-anchor", "middle")
            .style("fill", "#006eff") //+、-字体颜色
            .text(function (d) {
              if (d.name == "origin") {
                return "";
              }
              console.log(d);
              return hasChildNodeArr.indexOf(d) != -1 ? "+" : "";

              //  if (d._children&&d._children.length>0 || d.children&&d.children.length>0) {
              //             return "+";
              //           }
            })
            .on("click", click)
            .on("mouseenter", nodeOut)
            .on("mouseleave", nodeOut);
          // nodeUpdate.select('text').style('fill-opacity', 1)

          var nodeExit = node
            .exit()
            .transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();
          nodeExit.select("circle").attr("r", 1e-6);
          // nodeExit.select('text')
          //     .style('fill-opacity', 1e-6);

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
              return "#bbb";
            })
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("opacity", 0.5)
            .attr("d", function (d) {
              var o = {
                x: source.x0,
                y: source.y0,
              };
              return diagonal({
                source: o,
                target: o,
                d,
              });
            })
            .attr("marker-end", function (d) {
              return forUpward ? "url(#resolvedUp)" : "url(#resolvedDown)";
            }) //根据箭头标记的id号标记箭头;
            .attr("id", function (d, i) {
              return "mypath" + i;
            })
            .on("mouseenter", function (d) {
              console.log(d);
            });
          link
            .transition()
            .duration(duration)
            .attr("d", function (d) {
              return diagonal({ d });
            });
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
                d,
              });
            })
            .remove();
          nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
          function nodeClick(d) {
            console.log(d);
          }
          function nodeHover(d, i) {
            if (d.name != "origin") {
              console.log(d, "dddddddddddddddddd");
              if (d.parent.direction == "downward") {
                var links = d3.selectAll(".downwardLink")[0];
                links.map((item, index) => {
                  if (
                    item.__data__.source.id == d.parent.id &&
                    item.__data__.target.id == d.id
                  ) {
                    d3.select(item).attr("class", "downwardLink downLine");
                  } else if (item.__data__.source.id == d.id) {
                    d.children.forEach((citem) => {
                      if (item.__data__.target.id == citem.id) {
                        d3.select(item).attr("class", "downwardLink downLine");
                      }
                    });
                  }
                });
                // function changeUpLink(list){
                  
                // }
              } else {
                var links = d3.selectAll(".upwardLink")[0];
                links.map((item, index) => {
                  if (
                    item.__data__.source.id == d.parent.id &&
                    item.__data__.target.id == d.id
                  ) {
                    d3.select(item).attr("class", "upwardLink upLine");
                  } else if (item.__data__.source.id == d.id) {
                    d.children.forEach((citem) => {
                      if (item.__data__.target.id == citem.id) {
                        d3.select(item).attr("class", "upwardLink upLine");
                      }
                    });
                  }
                });
              }
            }
          }
          function nodeOut(d, i) {
            if (d.name != "origin") {
              if (d.parent.direction == "downward") {
                var links = d3.selectAll(".downwardLink")[0];
                links.map((item, index) => {
                  if (
                    item.__data__.source.id == d.parent.id &&
                    item.__data__.target.id == d.id
                  ) {
                    d3.select(item).attr("class", "downwardLink");
                  } else if (item.__data__.source.id == d.id) {
                    d.children.forEach((citem) => {
                      if (item.__data__.target.id == citem.id) {
                        d3.select(item).attr("class", "downwardLink");
                      }
                    });
                  }
                });
              } else {
                var links = d3.selectAll(".upwardLink")[0];
                links.map((item, index) => {
                  if (
                    item.__data__.source.id == d.parent.id &&
                    item.__data__.target.id == d.id
                  ) {
                    d3.select(item).attr("class", "upwardLink");
                  } else if (item.__data__.source.id == d.id) {
                    d.children.forEach((citem) => {
                      if (item.__data__.target.id == citem.id) {
                        d3.select(item).attr("class", "upwardLink");
                      }
                    });
                  }
                });
              }
            }
          }
          function Change_modal() {
            _this.Modal = true;
          }

          function click(d) {
            if (forUpward) {
            } else {
              if (d._children != null) {
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
              var list = [
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  direction: "downward",
                  amount: "100",
                  ratio: "55%",
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  isExpand: false,
                  direction: "downward",
                  amount: "100",
                  ratio: "55%",
                  children: [
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      ratio: "55%",
                      direction: "downward",
                      children: [],
                    },
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      direction: "downward",
                      ratio: "55%",
                      children: [],
                    },
                  ],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  direction: "downward",
                  children: [],
                },
              ];
              d._children = updateFirection(d, list);

              d._children.forEach(collapse);
              d.children = null;
              d3.select(this).text("+");
            } else {
              var list = [
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  direction: "downward",
                  children: [],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  isExpand: false,
                  amount: "100",
                  direction: "downward",
                  ratio: "55%",
                  children: [
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      ratio: "55%",
                      direction: "downward",
                      children: [],
                    },
                    {
                      name: "公司或股东名字",
                      hasHumanholding: false,
                      amount: "100",
                      direction: "downward",
                      ratio: "55%",
                      children: [],
                    },
                  ],
                },
                {
                  name: "公司或股东名字",
                  hasHumanholding: false,
                  amount: "100",
                  ratio: "55%",
                  direction: "downward",
                  children: [],
                },
              ];
              d.children = updateFirection(d, list);
              d.children.forEach(collapse);
              d._children = null;
              // expand all if it's the first node
              if (d.name == "origin") {
                d.children.forEach(expand);
              }
              d3.select(this).text("-");
            }
            console.log(d, "aaaaaaaaaaaaaaaaaaa");
            update(d, originalData, g);
          }
        }
        function updateFirection(d, list) {
          if (d.direction=="upward") {
            list.map((item, index) => {
              item.direction = "upward";
              if (item.children && item.children.length > 0) {
                item.children.map((citem) => {
                  citem.direction = "upward";
                });
              }
            });
          }
          return list;
        }
        function expand(d) {
          if (d._children) {
            d.children = d._children;
            d.children.forEach(expand);
            d._children = null;
          }
        }

        function collapse(d) {
          if (d.children) {
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
              d3.event.translate +
              ")" +
              " scale(" +
              d3.event.scale +
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
      };

      var d3GenerationChart = new treeChart(d3);
      d3GenerationChart.drawChart();
    },
  },
  mounted() {
    var child = document.getElementById("product_tree");
    child.innerHTML = "";
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
/deep/.downLine {
  stroke: #006eff;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 0.7s down-lines infinite;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
/deep/.upLine {
  stroke: #006eff;
  stroke-dasharray: 6, 2;
  stroke-dashoffset: 20;
  animation: 0.7s up-lines infinite;
  z-index: 999;
  opacity: 1;
  stroke-width: 2px;
}
@keyframes down-lines {
  0% {
    stroke-dashoffset: 100;
  }

  100% {
    stroke-dashoffset: -100;
  }
  0% {
    stroke-dashoffset: 100;
  }
}
@keyframes up-lines {
  0% {
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dashoffset: 100;
  }
  0% {
    stroke-dashoffset: 1100;
  }
}
/deep/.isExpand {
  dominant-baseline: middle;
  text-anchor: middle;
}
</style>
<style src="./index.css" scoped="scoped"></style>
