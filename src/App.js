import { Button, Card, Stack, Typography, Alert, Snackbar } from "@mui/material";
import QRCode from "react-qr-code";
import React from "react";

import File from "./File";

export default function App() {
  const [locations, setLocations] = React.useState([{
    title: "Locations",
    qrData: [
      "RZ-001",
      "RZ-002",
      "DOCK-001",
      "DOCK-002",
      "PW-001",
      "PW-002",

    ],
  }]);

  const [generatedPalletLabels, setGeneratedPalletLabels] = React.useState([]);

  const Locations = () => {
    return (
      <>
      {locations.map((section) => {
                  return (
                    <>
                      <Typography style={{fontSize: 20, fontWeight: "bold", marginTop: 20}}>{section.title}:</Typography>
                      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={5}>
                        {section.qrData.map((data) => {
                            return (
                                <QRCard data={data} />
                            );
                        })}
                      </Stack>
                    </>
                  );
                })}
      </>
    )
  }

  const Labels = () => {
    return (
      <>
      {generatedPalletLabels.map((section) => {
                  return (
                    <>
                      <Typography style={{fontSize: 20, fontWeight: "bold", marginTop: 20}}>{section.title}:</Typography>
                      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={5}>
                        {section.qrData.map((data) => {
                            return (
                                <QRCard data={data} />
                            );
                        })}
                      </Stack>
                    </>
                  );
                })}
      </>
    )
  }

  const copyToClipboard = () => {
    const code = `const simulateScan = (data) => {
      let i = 0;
      let interval;
      const pressKey = () => {
        if (i < data.length) {
          document.dispatchEvent(new KeyboardEvent("keypress", {key: data.charAt(i)}))
          i++;
        }
        else {
          document.dispatchEvent(new KeyboardEvent("keypress", {key: "Enter"}))
          clearInterval(interval);
        }
      }
    
      interval = setInterval(pressKey, 2);
    }`;
    
    navigator.clipboard.writeText(code);
  }
    return (
        <>
              
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <div style={{flex: 1, padding: 20}}>
                    <File setLabels={setGeneratedPalletLabels} />
                  </div>
                <div style={{flex: 1, padding: 20}}>
                  <Typography style={{fontWeight: "bold", fontSize: 18}}>
                    Instructions:
                  </Typography>
                  <Typography style={{ fontSize: 15, padding: 5}}>
                  Below you will see six qr codes generated. There are two receive zones, two dock doors, and two putaway zones. You can use these qr codes while going through the import workflow as long as you have created these locations in your test warehouse.
                  </Typography>
                  <Typography style={{ fontSize: 15, padding: 5}}>
                    To generate pallet labels, copy your warehosue request or inbound load file into the text area to the left and click the "Generate QR Codes" button. QR codes should be generated below the location qr codes for you to use.
                  </Typography>
                  <Typography style={{ fontSize: 15, padding: 5}}>
                    If you are on a laptop, you can click the "Simulate Scan Code" button below to copy the code to simulate a scan to your clipboard. Paste this into the console when you are going through the workflow to be able to use the simulateScan function.
                  </Typography>
                  <Typography style={{ fontSize: 15, padding: 5}}>
                    You can also click on any of the generated qr codes to copy to your clipboard the code to scan that qr code from your console.
                  </Typography>
                <Button variant="contained" onClick={copyToClipboard}>SimulateScan Code</Button>
                </div>

                </div>
                <Locations />
              <Labels />
        </>
    );
}

const QRCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const data = (props.data instanceof Object) ? JSON.stringify(props.data) : props.data;
  const text = (props.data instanceof Object) ? JSON.stringify(props.data, null, 2) : props.data;
  
  const copyToClipboard = () => {
    const toCopy = (props.data instanceof Object) ? JSON.stringify(props.data) : props.data;
    setOpen(true);
    navigator.clipboard.writeText(`simulateScan(${JSON.stringify(toCopy)})`);
  };

    return (
        <Card
          style={{width: 170, padding: 10}}
          sx={{
            ':hover': {
              boxShadow: 20,
              cursor: "pointer"
            },
            width: 170,
          }}
          onClick={copyToClipboard}>
            <QRCode value={data} size={170} />
            <Typography style={{fontSize: 9}}><pre>{text}</pre></Typography>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
              <Alert severity="success" sx={{ width: '100%' }}>
                Copied to clipboard
              </Alert>
            </Snackbar>
        </Card>
    );
}
