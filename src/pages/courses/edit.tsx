import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Create,
    TextField,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Edit
} from "@pankod/refine-mui";
import {useForm, Controller} from "@pankod/refine-react-hook-form";
import {ICourse, IFaculty} from "../../interfaces";


export const CourseEdit: React.FC = () => {
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
            <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
                    <TextField
                        {...register("ects", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="ECTS"
                        name="ects"
                    />
                    <TextField
                        {...register("cnps", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="CNPS"
                        name="cnps"
                    />
                    <TextField
                        {...register("zzu", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="ZZU"
                        name="zzu"
                    />
                    <TextField
                        {...register("bu", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="BU"
                        name="bu"
                    />
                    <TextField
                        {...register("hours_count", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="number"
                        label="Hours Count"
                        name="hours_count"
                    />
                    <TextField
                        {...register("code", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Code"
                        name="code"
                    />
                    <FormControl fullWidth >
                        <InputLabel id="type-label">Course Type</InputLabel>
                        <Select
                            {...register("type", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            label="type"
                            name="type"
                            sx={{
                                width: 200,
                                height: 50,
                            }}
                        >
                            <MenuItem value="laboratory">laboratorium</MenuItem>
                            <MenuItem value="practice">praktyka</MenuItem>
                            <MenuItem value="lecture">wykład</MenuItem>
                            <MenuItem value="project">projekt</MenuItem>
                            <MenuItem value="seminar">seminarium</MenuItem>
                            <MenuItem value="lang_course">język obcy</MenuItem>
                            <MenuItem value="thesis">lektorat</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        {...register("completing_form", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label="Completing Form"
                        name="completing_form"
                    />
                    <FormControl fullWidth >
                        <InputLabel id="course_form-label">Course Form</InputLabel>
                        <Select
                            {...register("course_form", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            label="course_form"
                            name="course_form"
                            sx={{
                                width: 200,
                                height: 50,
                            }}
                        >
                            <MenuItem value="stationary">stacjonarnie</MenuItem>
                            <MenuItem value="remote">zdalnie</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Edit>
        </>
    );
};