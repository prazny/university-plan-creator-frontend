import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Create,
    TextField,
    Box,
    Autocomplete, useAutocomplete, Select, MenuItem, InputLabel, FormControl
} from "@pankod/refine-mui";
import {useForm, Controller} from "@pankod/refine-react-hook-form";
import {IUser} from "../../interfaces";


export const UserCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IUser>();
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
                        {...register("login", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Login użytkownika"
                        name="login"
                    />
                    <TextField
                        {...register("email", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Email użytkownika"
                        name="email"
                    />
                    <TextField
                        {...register("password", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="password"
                        label="Hasło użytkownika"
                        name="password"
                    />
                </Box>
            </Create>
        </>
    );
};