import React, {useState} from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Create,
    TextField,
    Box,
    Autocomplete, useAutocomplete, Select, MenuItem, InputLabel, FormControl, Grid, Input, Typography
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
        formState: {errors,},
    } = useForm();
    const [semestersDetails, setSemestersDetails] = useState<{id: number, ects: number}[]>([])


    const {autocompleteProps: fieldAutocompleteProps} = useAutocomplete({
        resource: "fields",
    });

    function setSemesterCount(newLen: number) {
        let len = semestersDetails.length
        let newSemestersDetails = semestersDetails;
        if (newLen > len) {
            newSemestersDetails = semestersDetails
            while (len < newLen) {
                newSemestersDetails = [...newSemestersDetails, {"id": len, "ects": 0}]
                len = len + 1
            }
            setSemestersDetails(newSemestersDetails)
        } else if (newLen < len) {
            setSemestersDetails(semestersDetails.slice(0, newLen))
        }
    }


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
                                defaultValue={undefined as any}
                                render={({field}) => (
                                    <Autocomplete {...fieldAutocompleteProps}
                                                  {...field}
                                                  onChange={(_, value) => {
                                                      field.onChange(value.id);
                                                  }}
                                                  getOptionLabel={(item) => {
                                                      return (
                                                          item?.name
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

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                {...register("number_of_semesters", {
                                    required: "This field is required",
                                })}
                                onChange={value => setSemesterCount(parseInt(value.target.value))}
                                error={!!(errors as any)?.title}
                                helperText={(errors as any)?.title?.message}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                type="number"
                                label="Liczba semestrów"
                                name="number_of_semesters"
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name="form"
                                rules={{required: "This field is required"}}
                                render={({field}) => (
                                    <Autocomplete
                                        options={["fulltime", "parttime"]}
                                        getOptionLabel={(item) => {
                                            if (item == 'fulltime') return "Stacjonarnie"
                                            else if (item == 'parttime') return 'Niestacjonarnie'
                                            return "";
                                        }}
                                        {...field}
                                        defaultValue="file"
                                        onChange={(_, value) => {
                                            field.onChange(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Forma studiów"
                                                margin="normal"
                                                variant="outlined"
                                                error={!!errors.type}
                                                required
                                            />
                                        )}
                                    />
                                )}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5">Semestry</Typography>
                            {semestersDetails.length == 0 &&
                                <Typography>Wpisz liczbę semestrów</Typography>
                            }

                            {semestersDetails.map(item => {
                                return (
                                    <Grid key={item.id} container spacing={2}>
                                        <Grid item xs={2}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                InputLabelProps={{shrink: true}}
                                                type="text"
                                                value={item.id +1}
                                                label="Semestr"
                                                name="ects"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                InputLabelProps={{shrink: true}}
                                                type="text"
                                                label="Deficyt ECTS"
                                                name="ects"
                                            />
                                        </Grid>
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </Grid>
                </Box>
            </Create>
        </>
    );
};