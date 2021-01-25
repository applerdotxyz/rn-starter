import React from "react";
import { Text } from "react-native";
import { About } from "../../src/components/About";
import { ActionComp } from "../../src/components/ActionComp";
import { Comp5 } from "../../src/components/Comp5";
// import { JsonForm } from "./components/JsonForm";
import { Home } from "../../src/components/Home";
import { RandomPic } from "../../src/components/RandomPic";
import { rowStyle, styles } from "../common";

// All component which will be rendered
export const componentsSet = {
  Comp5,
  ActionComp,
  Home,
  About,
  RandomPic,
  // JsonForm
};

// components section
const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

export const routes = {};

routes.routeOne = {
  0: {
    0: {
      // layout: null // evict the earlier 1st column, other way is to hide it
      layout: {
        colConfig: {
          colSize: 3, // *** change the colSize
          colStyle: { display: "block" }, // *** hide the 1st column
        },
      },
    },
    1: {
      layout: {
        colConfig: {
          colSize: 8, // *** change the colSize
        },
        1: {
          // *** below we are adding a new row(this will replace current layout config values), and this will have 2 columns
          0: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 1",
          },
          1: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 2",
          },
          2: {
            // col no
            colSize: 10,
            idx: "About",
            label: "comp5 >> changed at runtime 3",
          },
        },
      },
    },
  },
};

routes.routeTwo = {
  "1.container": {
    "1.1.leftNavCol": {
      layout: null, // evict the earlier 1st column, other way is to hide it
      // layout: {
      //   colConfig: {
      //     // colSize: 0, // *** change the colSize
      //     colStyle: { display: "none" }, // *** hide the 1st column
      //   },
      // },
    },
    "1.2.bodyCol": {
      layout: {
        colConfig: {
          colSize: 11,
        },
        "1.2.1.bodyHeaderRow": {
          bodyHeader: {
            idx: "ActionComp",
          },
        },
        "1.2.2.bodyContentRow": {
          bodyContent: {
            idx: "RandomPic",
          },
        },
        "1.2.3.bodyFooterRow": {
          bodyFooter: {
            idx: "About",
          },
        },
      },
    },
  },
};

// *************************************************
//  Layout config
// *************************************************
export const appConfig = {
  /// 1st layout
  componentsSet,
  links: {
    "/": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Home",
    },
    "/about": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Feed",
    },
    "/contact": {
      style: styles.navItem,
      linkStyle: styles.tabName,
      linkText: "Messages",
    },
  },
  layout: {
    colConfig: {
      colSize: 1,
    },
    // row no
    "1.container": {
      rowConfig: {
        rowSize: 1,
        style: rowStyle,
      },
      // col no
      "1.1.leftNavCol": {
        layout: {
          colConfig: {
            colSize: 3,
          },
          "1.1.leftNavHeaderRow": {
            // row no
            rowConfig: {
              // rowSize: 1,
              rowStyle: {
                height: "10vh",
              },
            },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: { borderWidth: 1 },
            },
          },
          "1.1.leftNavBodyRow": {
            // row no
            rowConfig: {
              // rowSize: 1,
              rowStyle: {
                height: "90vh",
              },
            },
            leftNavBody: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavBody",
              colStyle: { borderWidth: 1 },
            },
          },
        },
      },
      "1.2.bodyCol": {
        layout: {
          colConfig: {
            colSize: 11,
          },
          "1.2.1.bodyHeaderRow": {
            // row no
            rowConfig: {
              rowStyle: { height: "10vh" },
            },
            bodyHeader: {
              // col no
              colSize: 1,
              idx: "About",
              label: "bodyHeader",
              schema,
              colStyle: { borderWidth: 1 },
            },
          },
          "1.2.2.bodyContentRow": {
            // row no
            rowConfig: {
              rowStyle: { height: "80vh" },
            },
            bodyContent: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "bodyContent",
              schema,
              colStyle: { borderWidth: 1, flex: 1 },
            },
          },
          "1.2.3.bodyFooterRow": {
            // row no
            rowConfig: {
              rowStyle: { height: "10vh" },
            },
            bodyFooter: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "bodyFooter",
              schema,
              colStyle: { borderWidth: 1 },
            },
          },
        },
      },
    },
    "2.container": {
      // row no
      rowConfig: {
        rowSize: "0.21",
        style: rowStyle,
      },
      footer: {
        // col no
        colSize: 1,
        idx: "Home",
        label: "footer",
        colStyle: { borderWidth: 4 },
      },
    },
  },
};

// *************************************************
//  "../applications/app-one/screen-one";
// *************************************************
// bind events to
//  logic that binds

export const events = {
  /// <label>
  //<label>-<element-id> : <handler>
  "leftNavHeader-btn-one": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {
      setLayoutConfig(routes["routeOne"]);

      // setLayoutConfig(routes["routeTwo"]);
      //   setAppState({
      //     bodyFooter: {
      //       ui: "ActionComp",
      //       props: { label: "bodyFooter" },
      //       children: <Text>Hello from RandomPic</Text>,
      //     },
      //     bodyContent: {
      //       ui: "RandomPic",
      //       props: { label: "actioncomp-2" },
      //       children: null,
      //     },
      //   });
    },
  },
  //<label>-<element-id>
  "leftNavHeader-btn-two": {
    // <event> :: <handler>
    onPress: (setLayoutConfig, setAppState) => {

      //   setLayoutConfig(routes["routeOne"]);

      setAppState({
        bodyFooter: {
          ui: "ActionComp",
          props: { label: "bodyFooter" },
          children: <Text>Hello from RandomPic</Text>,
          
        },
        bodyContent: {
          ui: "RandomPic",
          props: { label: "actioncomp-2" },
          children: null,
        },
      });
    },
  },

  // <label>
  "leftNavBody-btn-two": {},
  "leftNavBody-btn-one": {},
};

// *************************************************
//  Helper Util
// *************************************************
// bind events based on the layout config
export const getEvents = (elId, setLayoutConfig, setAppState) => {
  const elEvents = {};
  events[elId] &&
    Object.keys(events[elId]).map((eventName) => {
      // console.log({ [eventName]: events[elId][eventName] });
      elEvents[eventName] = () =>
        events[elId] && events[elId][eventName] && events[elId][eventName]
          ? events[elId][eventName](setLayoutConfig, setAppState)
          : {};
    });
  // console.log(elEvents);
  return elEvents;
};
