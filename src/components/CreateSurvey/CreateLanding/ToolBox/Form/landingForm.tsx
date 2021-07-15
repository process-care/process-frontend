import { Box, Button, Text, Container, Flex } from "@chakra-ui/react";
import { Footer } from "../Footer";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React from "react";
import { setEditAboutPage } from "redux/slices/landingBuilder";

import { t } from "static/createLanding";
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch } from "redux/hooks";
import { RepeatableFields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/RepeatableFields";
import { SvgHover } from "components/SvgHover";

import { ReactComponent as Delete } from "assets/delete.svg";
import { goTop } from "utils/application/scrollTo";
import { useHistory } from "react-router-dom";
import { ILanding } from "interfaces/landing";
import { useUpdateLanding } from "api/actions/Landing";

interface Props {
  data: ILanding;
}

export const LandingForm: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { mutateAsync: updateLanding } = useUpdateLanding();
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/");
  };

  const handleCancel = () => {
    history.push("/");
  };
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    const is_repeated_fields = target.id.includes("members");

    if (target.type === "file" || is_repeated_fields) {
      return false;
    } else if (target !== null) {
      updateLanding({
        id: data.id,
        data: {
          [target.id]: target.value,
        },
      });
    }
  };

  return (
    <Formik
      validateOnBlur={false}
      // initialValues={landing || initialValuesLanding}
      initialValues={data || initialValues}
      enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {({ values, setFieldValue }) => {
        // Handle wysiwyg change
        React.useEffect(() => {
          updateLanding({
            id: data.id,
            data: {
              wysiwyg: values.wysiwyg,
            },
          });
        }, [values.wysiwyg]);

        React.useEffect(() => {
          console.log("fire");
          updateLanding({
            id: data.id,
            data: {
              logo: values.logo,
              image_cover: values.image_cover,
            },
          });
        }, [values.logo, values.image_cover]);

        // Handle wysiwyg change
        React.useEffect(() => {
          updateLanding({
            id: data.id,
            data: {
              members: values.members,
            },
          });
        }, [values.members]);

        // Handle colors change
        React.useEffect(() => {
          updateLanding({
            id: data.id,
            data: {
              color_theme: values.color_theme,
            },
          });
        }, [values.color_theme]);

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
                onChange={(e) => console.log(e)}
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
                onChange={(e) => console.log(e)}
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
                  isDisabled={values.image_cover !== undefined}
                />
                <Box mt={7} ml={4}>
                  <SvgHover>
                    <Delete
                      onClick={() => {
                        updateLanding({
                          id: data.id,
                          data: { video_url: "" },
                        });
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
                onChange={(e) => console.log(e)}
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
                  dispatch(setEditAboutPage());
                }}
              >
                {t.see_more_cta}
              </Button>
              <Footer
                onCancel={() => handleCancel()}
                onSubmit={() => handleSubmit()}
              />
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};
