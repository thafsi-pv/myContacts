import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import {Font} from '@react-pdf/renderer';
import MyCustomFont from '../fonts/Anton-Regular.ttf';

Font.register({
  family: 'AntonFamily',
  src: MyCustomFont
})


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
});

const PDFFile = () => {

  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  const pages = [
    {text: 'First page content goes here...', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    {text: `LLorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.', image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    orem ipsum dolor sit amet consectetur adipisicing elit. Cumque, explicabo odit. Error, voluptatum? Nesciunt quas voluptatem repudiandae, accusamus dolorum nobis atque impedit molestiae obcaecati autem doloremque, consequatur vitae tempora nostrum? Rem quibusdam vel eaque soluta molestiae optio officia aspernatur mollitia ipsum quasi esse facilis, aliquam nisi officiis labore illum quaerat error autem at ut ea? Dolorem earum repellendus aperiam, labore accusantium accusamus veritatis commodi consequatur velit adipisci, doloribus suscipit, inventore voluptatem nulla pariatur qui deleniti. Voluptas esse id, beatae cupiditate facere dolorem vitae provident quasi. Nostrum numquam nam asperiores minus cum necessitatibus ullam voluptatum nihil iusto magni facilis, in quo.`, image: 'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcwMzExMzEwNTc0MTAxODM5/lebron-dunk.jpg' },
    {text: 'Third page content goes here...', image: 'https://s.yimg.com/ny/api/res/1.2/Aj5UoHHKnNOpdwE6Zz9GIQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/b02a71d0-a774-11ed-bf7f-08714e8ad300' },
  ]

  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page key={index} style={{...styles.body, backgroundColor: pageColors[index]}}>
          <Text style={styles.header} fixed></Text>
          <Image style={styles.image} src={page.image} />
          <Text style={styles.text}>
          {page.text}
          </Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </Page>
        )
      })}

    </Document>
  );
};

export default PDFFile;