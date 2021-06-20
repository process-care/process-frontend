import { Box, Button, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { Textarea } from "components/Fields";
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
            onSubmit={(data, { setSubmitting, validateForm }) => {
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
                        <Box borderTop="1px solid" borderColor="brand.line" w="100%" h="1px" my={10} />
                        <Wysiwyg id="landing_content" />
                        <Button variant="roundedTransparent" mt={4}>
                            {t.logo_cta}
                        </Button>
                        <Textarea id="video_url" rows="small" placeholder={t.subtitle_input} label={t.subtitle_input} helpText={t.subtitle_helptext} />
                        <Box borderTop="1px solid" borderColor="brand.line" w="100%" h="1px" my={10} />
                        <Text variant="currentBold">
                            {t.label_logo}
                        </Text>
                        <Button variant="roundedTransparent" mt={4}>
                            {t.logo_cta}
                        </Button>
                        <Box borderTop="1px solid" borderColor="brand.line" w="100%" h="1px" my={10} />

                        <Button variant="roundedTransparent" mt={4}>
                            {t.logo_cta}
                        </Button>
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