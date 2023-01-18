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
import {IPlans} from "../../interfaces";


export const PlanCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IPlans>();
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        control,
        formState: {errors},
    } = useForm();

    const {autocompleteProps: fieldAutocompleteProps} = useAutocomplete({
        resource: "fields",
    });


    return (
        <>
            <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <Controller control={control}
                                name="field_id"
                                rules={{required: "This field is required"}}
                        // eslint-disable-next-line
                                defaultValue={null as any}
                                render={({field}) => (
                                    <Autocomplete {...fieldAutocompleteProps}
                                                  {...field}
                                                  onChange={(_, value) => {
                                                      field.onChange(value.id);
                                                  }}
                                                  getOptionLabel={(item) => {
                                                      return (
                                                          fieldAutocompleteProps?.options?.find(
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
                                                          label="Kierunek"
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

                    <TextField
                        {...register("year", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="Rok rozpoczęcia"
                        name="year"
                    />
                    <TextField
                        {...register("number_of_semesters", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="Liczba semestrów"
                        name="number_of_semesters"
                    />
                    <TextField
                        {...register("lang", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Język"
                        name="lang"
                    />
                    <FormControl fullWidth >
                        <InputLabel id="form-label">Forma studiów</InputLabel>
                        <Select
                            {...register("form", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            label="form"
                            name="form"
                            sx={{
                                width: 200,
                                height: 50,
                            }}
                        >
                            <MenuItem value="fulltime">stacjonarne</MenuItem>
                            <MenuItem value="parttime">niestacjonarne</MenuItem>
                        </Select>
                    </FormControl>


                </Box>
            </Create>
        </>
    );
};