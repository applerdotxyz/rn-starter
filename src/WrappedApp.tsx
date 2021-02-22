// import { registerRootComponent } from "expo";
import merge from "deepmerge";
import { object } from "dot-object";
import React from "react";
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

import {
  GridSection,
  JSONEditor,
} from "./rn-config-tyler/packages/demo/helpers/lib/src/index";

// INFO: when using the npmjs module
// import { GridSection, JSONEditor } from "rn-config-tyler/dist/index.es";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

//  overall container app
export default class WrappedApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props?.appConfig,
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    console.log(this?.state?.config);
    return (
      <>
        <GridSection
          getEvents={this.props?.getEvents}
          getInitEvents={this.props?.getInitEvents}
          layoutConfig={this.state?.config}
          routes={this.props?.routes}
          setLayoutConfig={(
            config,
            isFullConfig = false,
            isDottedFormat = false
          ) => {
            console.log(this?.state?.config);
            // TODO: find out if the object is in collapsed/dotted format
            if (isDottedFormat) {
              // expand to proper JSON from dotted notation
              config = object(config);
            }
            if (isFullConfig) {
              this.setStateAsync({
                config: {
                  ...this.state.config,
                  layout: config,
                },
              }).then(() => {
                console.log(this?.state?.config);
                console.log(isFullConfig, "if");
              });
            } else {
              this.setStateAsync({
                // TODO: fix this to be possible with only identifier
                config: merge(
                  this?.state?.config,
                  { layout: config },
                  { arrayMerge: overwriteMerge }
                ),
              }).then(() => {
                console.log(this?.state?.config);
                console.log(isFullConfig, "else");
              });
            }
          }}
        />
      </>
    );
  }
}
