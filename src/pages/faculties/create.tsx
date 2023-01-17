import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Create,
    TextField,
    Box,
    Autocomplete
} from "@pankod/refine-mui";
import {useForm, Controller} from "@pankod/refine-react-hook-form";
import {IFaculty} from "../../interfaces";


const columns: GridColumns<IFaculty> = [
    {field: "name", headerName: "Name", flex: 1, minWidth: 350},
];

export const FacultyCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IFaculty>();
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        control,
        formState: {errors},
    } = useForm();

    return (
        <>
            <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <TextField
                        {...register("name", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Name"
                        name="name"
                    />
                </Box>
            </Create>
        </>
    );
};