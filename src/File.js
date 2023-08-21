import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const File = ({ setLabels }) => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [requestData, setRequestData] = React.useState("");

    const formatLabels = () => {
        try {
            const { cargo } = JSON.parse(requestData);
            if (!cargo) throw new Error("Cargo is not defined in json");

            const generated = [];

            cargo.map((item) => {

                generated.push({
                    flexId: item.warehouse_request_id,
                    palletId: generatePalletId(),
                    count: 1,
                    totalCount: 2
                });
                generated.push({
                    flexId: item.warehouse_request_id,
                    palletId: generatePalletId(),
                    count: 2,
                    totalCount: 2
                });
            });

            setLabels([{
                title: "Generated Pallet Labels",
                qrData: generated,
            }]);

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const generatePalletId = () => {
        return `PLT-${Math.random().toString().split('.')[1].substring(0,8)}`
    };

    return (
        <div>
            <TextField multiline minRows={15} maxRows={15} style={{width: "100%"}} value={requestData} onChange={(e) => {setRequestData(e.target.value); setErrorMessage("");}}/>
            <Typography style={{color: "red"}}>{errorMessage}</Typography>
            <Button onClick={formatLabels}>Generate QR codes</Button>
        </div>
    );
};

export default File;