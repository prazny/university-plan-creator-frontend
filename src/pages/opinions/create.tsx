import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Create,
    TextField,
    Box,
    Autocomplete, useAutocomplete, Select, MenuItem, InputLabel, FormControl, Checkbox
} from "@pankod/refine-mui";
import {useForm, Controller} from "@pankod/refine-react-hook-form";
import {IOpinion} from "../../interfaces";


export const OpinionCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IOpinion>();
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        control,
        formState: {errors},
    } = useForm();

    const {autocompleteProps: userAutocompleteProps} = useAutocomplete({
        resource: "users",
    });

    const {autocompleteProps: planAutocompleteProps} = useAutocomplete({
        resource: "plans",
    });

    return (
        <>
            <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <label>Czy zatwierdzona?</label>
                    <Checkbox
                        {...register("is_approved", {
                            required: "This field is required",
                        })}
                        name="is_approved"
                    />
                    <TextField
                        {...register("description", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Opis"
                        name="description"
                    />
                   
                   <Controller control={control}
                                name="user_id"
                                rules={{required: "This field is required"}}
                        // eslint-disable-next-line
                                defaultValue={null as any}
                                render={({field}) => (
                                    <Autocomplete {...userAutocompleteProps}
                                                  {...field}
                                                  onChange={(_, value) => {
                                                      field.onChange(value.id);
                                                  }}
                                                  getOptionLabel={(item) => {
                                                      return (
                                                          userAutocompleteProps?.options?.find(
                                                              (p) =>
                                                                  p?.id?.toString() ===
                                                                  item?.id?.toString(),
                                                          )?.name ?? ""
                                                      );
                                                  }}
                                                  isOptionEqualToValue={(option, value) =>
                                                      value === undefined ||
                                                      option.id.toString() === value?.id?.toString()
                                                  }
                                                  renderInput={(params) => (
                                                      <TextField
                                                          {...params}
                                                          label="Użytkownik"
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

<Controller control={control}
                                name="plan_id"
                                rules={{required: "This field is required"}}
                        // eslint-disable-next-line
                                defaultValue={null as any}
                                render={({field}) => (
                                    <Autocomplete {...planAutocompleteProps}
                                                  {...field}
                                                  onChange={(_, value) => {
                                                      field.onChange(value.id);
                                                  }}
                                                  getOptionLabel={(item) => {
                                                      return (
                                                          planAutocompleteProps?.options?.find(
                                                              (p) =>
                                                                  p?.id?.toString() ===
                                                                  item?.id?.toString(),
                                                          )?.year ?? ""
                                                      );
                                                  }}
                                                  isOptionEqualToValue={(option, value) =>
                                                      value === undefined ||
                                                      option.id.toString() === value?.id?.toString()
                                                  }
                                                  renderInput={(params) => (
                                                      <TextField
                                                          {...params}
                                                          label="Plan"
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