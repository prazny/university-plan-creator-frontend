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
import {IField} from "../../interfaces";


export const FieldCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IField>();
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        control,
        formState: {errors},
    } = useForm();

    const {autocompleteProps: facultyAutocompleteProps} = useAutocomplete({
        resource: "faculties",
    });


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
                    <FormControl fullWidth>
                        <InputLabel id="profile-label">Profile</InputLabel>
                        <Select
                            {...register("profile", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            label="Profil"
                            name="profile"
                            sx={{
                                width: 200,
                                height: 50,
                            }}
                        >
                            <MenuItem value="academic">Academic</MenuItem>
                            <MenuItem value="practical">practical</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl fullWidth >
                        <InputLabel id="level-label">Level</InputLabel>
                        <Select
                            {...register("level", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            label="level"
                            name="level"
                            sx={{
                                width: 200,
                                height: 50,
                            }}
                        >
                            <MenuItem value="undergraduate">undergraduate</MenuItem>
                            <MenuItem value="engineering">engineering</MenuItem>
                        </Select>
                    </FormControl>

                    <Controller control={control}
                                name="faculty_id"
                                rules={{required: "This field is required"}}
                        // eslint-disable-next-line
                                defaultValue={undefined}
                                render={({field}) => (
                                    <Autocomplete {...facultyAutocompleteProps}
                                                  {...field}
                                                  onChange={(_, value) => {
                                                      field.onChange(value.id);
                                                  }}
                                                  getOptionLabel={(item) => {
                                                      return (
                                                          item?.name
                                                      );
                                                  }}

                                                  isOptionEqualToValue={(option, value) => {
                                                      return value === undefined ||
                                                      option.id.toString() === value?.id?.toString()
                                                  }

                                                  }
                                                  renderInput={(params) => (
                                                      <TextField
                                                          {...params}
                                                          label="Wydział"
                                                          margin="normal"
                                                          variant="outlined"
                                                          error={!!(errors as any)?.field?.id}
                                                          helperText={
                                                              (errors as any)?.field?.id?.message
                                                          }
                                                          required/>
                                                  )}
                                    />
                                )}

                    />
                </Box>
            </Create>
        </>
    );
};