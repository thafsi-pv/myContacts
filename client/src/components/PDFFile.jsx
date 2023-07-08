import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import MyCustomFont from "../fonts/Anton-Regular.ttf";
import axios from "axios";
import { convertFirstLetterToCapital, formatNo} from "../utils/utils";

Font.register({
  family: "AntonFamily",
  src: MyCustomFont,
});

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 20,
  },
  innerTable: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 5,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  innerTableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  innerTableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  innerTableCell: {
    marginTop: 5,
    fontSize: 10,
  },
  imageView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 130,
    height: 40,
  },
});

const PDFFile = () => {
  const [allContacts, setAllContacts] = useState([]);
  console.log(
    "🚀 ~ file: PDFFile.jsx:53 ~ PDFFile ~ allContacts:",
    allContacts
  );

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    const response = await axios("http://localhost:3458/api/contacts");
    setAllContacts(response?.data);
  };

  const pageColors = ["#f6d186", "#f67280", "#c06c84"];

  const pages = [
    {
      text: "First page content goes here...",
      image:
        "https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg",
    },
    {
      text: `LLorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    orem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.`,
      image:
        "https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg",
    },
    {
      text: "Third page content goes here...",
      image:
        "https://s.yimg.com/ny/api/res/1.2/Aj5UoHHKnNOpdwE6Zz9GIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/b02a71d0-a774-11ed-bf7f-08714e8ad300",
    },
  ];

  // return (
  //   <Document>
  //     {pages.map((page, index) => {
  //       return (
  //         <Page
  //           key={index}
  //           style={{ ...styles.body, backgroundColor: pageColors[index] }}>
  //           <Text style={styles.header} fixed></Text>
  //           <Image style={styles.image} src={page.image} />
  //           <Text style={styles.text}>{page.text}</Text>
  //           <Text
  //             style={styles.pageNumber}
  //             render={({ pageNumber, totalPages }) =>
  //               `${pageNumber} / ${totalPages}`
  //             }
  //           />
  //         </Page>
  //       );
  //     })}
  //   </Document>
  // );
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            src="https://static.mycoracle.com/mycoracle-website/media/article-images/mycontacts2.png"
          />
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Contact Numbers</Text>
            </View>
          </View>
          {allContacts.map((item) => {
            return (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.firstName} {item.lastName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <View style={styles.innerTable}>
                    {Object.keys(item?.contactNos[0]).map((contact) => {
                      return (
                        <View style={styles.innerTableRow}>
                          <View style={styles.innerTableCol}>
                            <Text style={styles.innerTableCell}>
                              {convertFirstLetterToCapital(contact)}
                            </Text>
                          </View>
                          <View style={styles.innerTableCol}>
                            <Text style={styles.innerTableCell}>
                              {formatNo(item?.contactNos[0][contact])}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
