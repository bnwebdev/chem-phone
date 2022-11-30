import { FC } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";

const columns: GridColDef[] = [
    { field: "id", headerName: 'Id', align: 'center', headerAlign: 'center' },
    { field: "createdAt", headerName: 'Created At', width: 300, type: 'date', align: 'center', headerAlign: 'center' },
    { field: "status", headerName: 'Status', align: 'center', headerAlign: 'center' },
]

const rows = new Array(30).fill(0).map((_, id) => ({
    id,
    status: Math.random() > 0.333 ? Math.random() > 0.666 ? 1 : 2 : 0,
    createdAt: new Date(),
}))

const PhotoAnalyzer: FC = () => {

    return <>
        <Box mt={3}>
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </Box>
    </>
}

export default PhotoAnalyzer;
