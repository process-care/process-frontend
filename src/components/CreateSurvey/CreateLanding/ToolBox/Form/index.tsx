import { Box, Button, Text, Container } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React from "react"
import { t } from "static/createLanding"

export const LandingForm: React.FC = () => {
    const onChange = (event: React.FormEvent<HTMLFormElement>) => {
        const target = event.target as HTMLFormElement;
        if (target !== null) {
            // dispatch(
            //     updatePage({
            //         id: selected_page.id,
            //         data: {
            //             [target.id]: target.checked ? target.checked : target.value,
            //         },
            //     })
            // );
        }

    };
    return (
        <Formik
            validateOnBlur={false}
            initialValues={{}}
            enableReinitialize
            onSubmit={(data, { setSubmitting, validateForm },) => {
                validateForm(data);
                setSubmitting(true);

            }}>
            {() => {
                return (
                    <Form
                        onChange={(event) => onChange(event)}
                        style={{ width: "100%", marginTop: "33px" }}>
                        <Textarea id="title" rows="small" placeholder={t.title_input} label={t.title_input} helpText={t.title_helptext} />
                        <Textarea id="subtitle" rows="small" placeholder={t.subtitle_input} label={t.subtitle_input} helpText={t.subtitle_helptext} />
                        <Container variant="hr" my={10} />

                        <Wysiwyg id="landing_content" />
                        <UploadFile label={t.image_cta} id="image_cover" />
                        <Button variant="roundedTransparent" mt={4}>
                            {t.image_cta}
                        </Button>
                        <Textarea id="video_url" rows="small" placeholder={t.video_url_placeholder} label={t.video_url_label} />
                        <Container variant="hr" my={10} />

                        <Textarea id="member" rows="small" placeholder={t.member_placeholder} label={t.team_label} />
                        <Textarea id="member" rows="small" placeholder={t.member_placeholder_2} label={t.team_label} />

                        <Text variant="currentBold">
                            {t.image_cta}
                        </Text>

                        <Button variant="roundedTransparent" mt={4}>
                            {t.image_cta}
                        </Button>
                        <Container variant="hr" my={10} />

                        <Text variant="currentBold">
                            {t.logos_label}
                        </Text>
                        <Container variant="hr" my={10} />


                        <Text variant="currentBold">
                            {t.see_more_cta}
                        </Text>

                        <Button variant="roundedTransparent" mt={4}>
                            {t.logo_cta}
                        </Button>
                        <Box mb="100"></Box>
                        <Footer
                            onCancel={() => console.log("")}
                            onSubmit={() => console.log("")}
                            onDelete={() => console.log("")}
                        />
                    </Form>
                )
            }}
        </Formik>
    )
}