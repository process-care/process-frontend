import { Box, Button, Text, Container, Flex } from "@chakra-ui/react";
import { Footer } from "./../Footer";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React from "react";
import { updateLanding } from "redux/slices/landingBuilder";
import { t } from "static/createLanding";
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useDispatch } from "react-redux";
import { RepeatableFields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/RepeatableFields";
import { SvgHover } from "components/SvgHover";

import { ReactComponent as Delete } from "assets/delete.svg";
import { goTop } from "utils/application/scrollTo";

export const LandingForm: React.FC = () => {
  const [isAboutMode, setIsAboutMode] = React.useState(false);
  const dispatch = useDispatch();
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target.type === "file") {
      return false;
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
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {({ values, setFieldValue }) => {
        console.log(values);
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

        // Handle wysiwyg change
        React.useEffect(() => {
          dispatch(
            updateLanding({
              data: {
                members: values.members,
              },
            })
          );
        }, [values.members]);

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
        if (isAboutMode) {
          return (
            <Box
              w="90%"
              mx="auto"
              mt="100px"
              h="100%"
              sx={{
                ".jodit-workplace": {
                  height: "60vh !important",
                },
              }}
            >
              <Wysiwyg id="about" />
              <Footer
                onCancel={() => setIsAboutMode(false)}
                onSubmit={() => console.log("")}
              />
            </Box>
          );
        }
        return (
          <Box
            pos="relative"
            mt="80px"
            p={4}
            d="flex"
            alignItems="flex-start"
            flexDirection="column"
            textAlign="left"
          >
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}
            >
              <Text variant="currentBold">{t.label_logo}</Text>
              <UploadFile
                label={t.logo_cta}
                id="logo"
                helpText={t.logo_helptext}
              />
              <Text variant="currentBold" mt={9}>
                {t.theme_label}
              </Text>
              <ColorPicker />
              <Textarea
                id="title"
                rows="medium"
                placeholder={t.title_input}
                label={t.title_input}
                helpText={t.title_helptext}
              />
              <Textarea
                id="subtitle"
                rows="large"
                placeholder={t.subtitle_input}
                label={t.subtitle_input}
                helpText={t.subtitle_helptext}
              />
              <Container variant="hr" my={10} />
              <Text variant="currentBold" mt={9} mb={2}>
                {t.content_label}
              </Text>
              <Wysiwyg id="landing_content" simpleMode />
              <Container variant="hr" my={10} />
              <Text variant="currentBold">{t.add_image}</Text>
              <UploadFile
                label={t.image_cta}
                id="image_cover"
                helpText={t.image_helptext}
                isDisabled={values.video_url !== ""}
              />
              <Flex alignItems="center">
                <Textarea
                  id="video_url"
                  rows="small"
                  placeholder={t.video_url_placeholder}
                  label={t.video_url_label}
                  isDisabled={values.image_cover[0]?.base64 !== undefined}
                />
                <Box mt={7} ml={4}>
                  <SvgHover>
                    <Delete
                      onClick={() => {
                        dispatch(
                          updateLanding({
                            data: { video_url: "" },
                          })
                        );
                        setFieldValue("video_url", "");
                      }}
                    />
                  </SvgHover>
                </Box>
              </Flex>

              <Container variant="hr" my={10} />
              <Text variant="currentBold" mt={9}>
                {t.team_label}
              </Text>
              <RepeatableFields name="members" />
              <Container variant="hr" my={10} />
              <Text variant="currentBold">{t.logos_label}</Text>
              <UploadFile
                label={t.logos_cta}
                id="partner_logos"
                helpText={t.image_helptext}
                multiple
              />
              <Container variant="hr" my={10} />
              <Text variant="currentBold">{t.see_more_cta}</Text>
              <Button
                variant="roundedTransparent"
                mt={4}
                mb="100px"
                onClick={() => {
                  goTop();
                  setIsAboutMode(true);
                }}
              >
                {t.see_more_cta}
              </Button>
              <Footer
                onCancel={() => console.log("")}
                onSubmit={() => console.log("")}
              />
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};
