import { Box, Button, Text, Container } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React from "react"
import { updateLanding } from "redux/slices/landingBuilder";
import { t } from "static/createLanding"
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useDispatch } from "react-redux";

export const LandingForm: React.FC = () => {
    const dispatch = useDispatch()
    const onChange = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as HTMLFormElement;
        if (target.type === "file") {
            return false
        } else if (target !== null) {
            dispatch(
                updateLanding({
                    data: {
                        [target.id]: target.value,
                    },
                })
            );
        }

    };
    return (
        <Formik
            validateOnBlur={false}
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(data, { setSubmitting, validateForm },) => {
                validateForm(data);
                setSubmitting(true);

            }}>
            {({ values }) => {
                // Handle wysiwyg change
                React.useEffect(() => {
                    dispatch(
                        updateLanding({
                            data: {
                                wysiwyg: values.wysiwyg,
                            },
                        })
                    );
                }, [values.wysiwyg]);

                // Handle colors change
                React.useEffect(() => {
                    dispatch(
                        updateLanding({
                            data: {
                                color_theme: values.color_theme,
                            },
                        })
                    );
                }, [values.color_theme]);
                return (
                    <Box p={4} d="flex" alignItems="flex-start" flexDirection="column" textAlign="left">
                        <Form
                            onChange={(event) => onChange(event)}
                            style={{ width: "100%" }}>

                            <Text variant="currentBold">
                                {t.label_logo}
                            </Text>
                            <UploadFile label={t.logo_cta} id="logo" helpText={t.logo_helptext} />
                            <Text variant="currentBold" mt={9}>
                                {t.theme_label}
                            </Text>
                            <ColorPicker />
                            <Textarea id="title" rows="medium" placeholder={t.title_input} label={t.title_input} helpText={t.title_helptext} />
                            <Textarea id="subtitle" rows="large" placeholder={t.subtitle_input} label={t.subtitle_input} helpText={t.subtitle_helptext} />
                            <Container variant="hr" my={10} />

                            <Wysiwyg id="landing_content" />
                            <UploadFile label={t.image_cta} id="image_cover" helpText={t.image_helptext} isDisabled={values.video_url !== ""} />

                            <Textarea id="video_url" rows="small" placeholder={t.video_url_placeholder} label={t.video_url_label} isDisabled={values.image_cover !== ""} />
                            <Container variant="hr" my={10} />
                            <Text variant="currentBold" mt={9}>
                                {t.team_label}
                            </Text>
                            <Textarea id="member" rows="small" placeholder={t.member_placeholder} label="" />
                            <Textarea id="member" rows="small" placeholder={t.member_placeholder_2} label="" />
                            <UploadFile label={t.photo_member_cta} id="photo_member" helpText={t.image_helptext} />
                            <Container variant="hr" my={10} />
                            <Text variant="currentBold">
                                {t.logos_label}
                            </Text>
                            <UploadFile label={t.logos_cta} id="photo_member_cta" helpText={t.image_helptext} />
                            <Container variant="hr" my={10} />
                            <Text variant="currentBold">
                                {t.see_more_cta}
                            </Text>
                            <Button variant="roundedTransparent" mt={4}>
                                {t.see_more_cta}
                            </Button>
                            <Footer
                                onCancel={() => console.log("")}
                                onSubmit={() => console.log("")}
                                onDelete={() => console.log("")}
                            />
                        </Form>
                    </Box>
                )
            }}
        </Formik>
    )
}