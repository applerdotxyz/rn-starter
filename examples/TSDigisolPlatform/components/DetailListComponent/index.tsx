/* eslint-disable react/prop-types */
import { match } from "assert";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { ShowEntity } from "./ShowEntity";
import { routes } from "../../configs/routes/routesConfig";
import { ScrollView } from "react-native-gesture-handler";

const TextRender = ({ textFeild, value }: any) => {
  return (
    <Row
      style={{
        margin: 10,
      }}
    >
      <Col>
        <Text>{textFeild} : </Text>
      </Col>
      <Col>
        <Text>{value}</Text>
      </Col>
    </Row>
  );
};

const Item = ({ item, onPress, style }: any) => (
  <TouchableOpacity onPress={onPress} style={[detailViewStyles.item, style]}>
    <Grid
      style={{
        flex: 1,
        // borderWidth: 3,
      }}
    >
      <Row
        style={
          {
            // borderWidth: 1,
            // height: Dimensions.get("window").height - 500
          }
        }
      >
        <Col
          style={
            {
              // borderWidth: 1,
            }
          }
        >
          <Text style={detailViewStyles.title}>Bill To Address Details</Text>
          {/* <Text>{JSON.stringify(match.params.orderKey)}</Text>
          <Text>{JSON.stringify(routes)}</Text> */}
        </Col>
      </Row>
      <Row
        style={{
          // borderWidth: 1,
          padding: 10,
          flex: 1,
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Col
          style={
            {
              // borderWidth: 1,
            }
          }
        >
          {/* TODO : ADD display name feild in API to generate Display text of the field */}
          <TextRender
            textFeild={`Address Info Key`}
            value={item.addressInfoKey}
          />
          <TextRender textFeild={`First Name`} value={item.firstName} />
          <TextRender textFeild={`Last Name`} value={item.lastName} />
          <TextRender textFeild={`City`} value={item.city} />
          <TextRender textFeild={`State`} value={item.state} />
          <TextRender textFeild={`Postal code`} value={item.postalCode} />
        </Col>
      </Row>
    </Grid>
  </TouchableOpacity>
);

export const DetailListComponent = (props: {
  appState: any;
  label: any;
  styles: any;
  children: any;
  setAppState: any;
  layoutConfig: any;
  setLayoutConfig: any;
  getEvents: any;
  events: any;
}) => {
  const {
    appState,
    label,
    styles,
    children,
    setAppState,
    layoutConfig,
    setLayoutConfig,
    getEvents,
  } = props;

  console.log(`label is ${label}`);
  console.log(getEvents(`${label}-btn-one`, setLayoutConfig, setAppState));

  const [action, setAction] = useState({
    actionKey: "",
    actionName: "View",
    endPoint: "",
    httpMethod: "GET",
    showButton: true,
    tabKey: "",
  });

  const [formLayout, setFormLayout] = useState({
    type: "object",
    properties: {},
  });

  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAction = async () => {
      const res1 = await fetch(
        `http://localhost:8080/transaction-web/v1/schema/modulelayout`,
        // `https://run.mocky.io/v3/31e2c2ab-c3de-464a-9f75-17324669aa95`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "TsdAdmin",
            roleKey: 1,
            moduleName: "Catalog",
            actionName: "View",
            tabName: "Sku",
          }),
        }
      );
      const res1JSON = await res1.json();
      // console.log(
      //   "action : : ",
      //   res1JSON.businessFunctions[0].modules[0].tabs[0].actions[0]
      // );

      setAction(res1JSON.businessFunctions[0].modules[0].tabs[0].actions[0]);
    };

    const fetchFormLayout = async () => {
      const res = await fetch(
        `http://localhost:8080/transaction-web/v1/schema/singleformLayout`,
        // `https://run.mocky.io/v3/31e2c2ab-c3de-464a-9f75-17324669aa95`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            moduleKey: 2001,
            roleKey: 1,
            tabKey: 3004,
            userId: "TsdAdmin",
            actionName: "View",
          }),
        }
      );
      const resJSON = await res.json();

      setFormLayout(resJSON);
    };

    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:8080/transaction-web/v1/sku/112264303`,
        // `http://localhost:8080/transaction-web/${action.endPoint}1122137901`,
        // `https://run.mocky.io/v3/31e2c2ab-c3de-464a-9f75-17324669aa95`,
        {
          method: `${action.httpMethod}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            languageKey: 1,
          },
        }
      );
      const resJSON = await res.json();
      setdata(resJSON);

      setLoading(false);
    };

    fetchAction();
    // fetchFormLayout();
    fetchData();
  }, []);

  if (loading)
    return (
      <View style={detailViewStyles.container}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View>
      {/* <Text style={{}}>DetailListComponent *** {label}</Text>
      <Text>
        <h1>{label}</h1>
      </Text> */}
      {/* <ScrollView
        style={{
          borderWidth: 5,
          maxHeight: 400,
        }}
      > */}
      <View>
        <ShowEntity props={props} viewData={data} />
      </View>
      {/* </ScrollView> */}
      {children || (appState && appState[label] && appState[label]?.children)}
    </View>
  );
};

const detailViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  item: {
    padding: 10,
    margin: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: "solid",
    opacity: 1,
    // borderRadius: 2,
    // height: 330,
    // alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    color: "#0d47a1",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#0d47a1",
    textAlign: "left",
  },
  subInfo: {
    fontSize: 12,
    color: "#1565c0",
    textAlign: "center",
    fontWeight: "bold",
  },
});
