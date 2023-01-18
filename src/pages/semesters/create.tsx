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


export const SemesterCreate: React.FC = () => {
    const {dataGridProps} = useDataGrid<IPlans>();
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        control,
        formState: {errors},
    } = useForm();

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

                    <TextField
                        {...register("semester_number", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="Numer semestru"
                        name="semester_number"
                    />
                    <TextField
                        {...register("max_ects_deficit", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="Maks. deficyt ECTS"
                        name="max_ects_deficit"
                    />
                </Box>
            </Create>
        </>
    );
};