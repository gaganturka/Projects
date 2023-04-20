// import React, { useState } from 'react';
// import JSZip from 'jszip';
// // import pdf from "pdfjs-dist/es5/build/pdf"
// import { PDFDocument } from 'pdfjs-dist/es5/build/pdf';


// const FileReaderComponent = () => {
//  const [paste, setPaste] = useState([])

//  const recive = event => {
//     const pasteText = event.clipboardData.getData('text')
//     const collectedEmail = pasteText.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)
//     setPaste(collectedEmail)
//  }

//  return (<>
//  {paste.map((email, index) => <li>{email}</li>)}
//  <input onPaste={event => recive(event)} type="text" placeholder='
//  sdfsdfs' />
//   </>


//  )


// import React from 'react';

// class EmailExtractor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       emailList: [] // state to store the extracted email list
//     };
//   }

//   handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const fileContent = event.target.result;
//       const emailPattern =(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g); // regular expression to match email addresses
//       const extractedEmails = fileContent.match(emailPattern) || []; // extracting emails using the regular expression
//       this.setState({ emailList: extractedEmails }); // updating state with extracted email list
//     };

//     reader.readAsText(file);
//   }

//   render() {
//     const { emailList } = this.state;
//     return (
//       <div>
//         <h2>Email Extractor</h2>
//         <input type="file" onChange={this.handleFileUpload} />
//         <h3>Extracted Emails:</h3>
//         <ul>
//           {emailList.map((email, index) => (
//             <li key={index}>{email}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default EmailExtractor;


import React, { useState } from 'react';

const EmailExtractor = () => {
  const [emailList, setEmailList] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      const emailPattern = (/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g);
      const extractedEmails = fileContent.match(emailPattern) || [];
      setEmailList(extractedEmails);
    };

    reader.readAsText(file);
  }

  return (
    <div>
      <h2>Email Extractor</h2>
      <input type="file" onChange={handleFileUpload} />
      <h3>Extracted Emails:</h3>
      <ul>
        {emailList.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmailExtractor;

