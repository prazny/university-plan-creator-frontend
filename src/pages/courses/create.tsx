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
import {ICourse, IFaculty} from "../../interfaces";


export const CourseCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<ICourse>();
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