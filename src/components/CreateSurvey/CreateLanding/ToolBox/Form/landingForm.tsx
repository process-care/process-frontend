import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React, { useCallback, useRef } from "react";

import { t } from "static/createLanding";
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RepeatableJobs } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/RepeatableJobs";
import { SvgHover } from "components/SvgHover";

import { ReactComponent as Delete } from "assets/delete.svg";
import { goTop } from "utils/application/scrollTo";
import { actions, selectors } from "redux/slices/landing-editor";
import { Footer } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/Footer";
import { useHistory } from "react-router-dom";
import { TitleDivider } from "components/TitleDivider";

export const LandingForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // Flag to avoid saving the initial values injected into Formik
  const firstRender = useRef(true);
  const data = useAppSelector(selectors.landing);

  const onSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
  }, []);

  const logOnChange = useCallback((e) => console.log(e), []);

  const onEditAbout = useCallback(() => {
    goTop();
    dispatch(actions.editAbout(true));
  }, []);

  const onSave = () => {
    dispatch(actions.update({ ...data }));
    history.push("/dashboard");
  };

  const handleCancel = () => {
    history.push("/dashboard");
  };

  return (
    <Formik
      validateOnBlur={false}
      initialValues={data || initialValues}
      onSubmit={onSubmit}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      {({ values, setFieldValue, isValid, isSubmitting }) => {
        // Handle update value
        React.useEffect(() => {
          if (firstRender.current) {
            firstRender.current = false;
            return;
          }

          dispatch(actions.update({ ...values }));
        }, [values]);

        // Target params for various uploads (cover, partners)
        // const targets = useMemo(() => {
        //   const base = { refId: values.id, ref: "landing" };
        //   return {
        //     partners: { ...base, field: "partners" },
        //     // cover: { ...base, field: "cover" },
        //   };
        // }, [values.id]);

        // Delete video handler
        const onDeleteVideo = useCallback(() => {
          dispatch(actions.update({ video_url: "" }));
          setFieldValue("video_url", "");
        }, []);

        // Components
        return (
          <Box pos="relative" p={4} d="flex" textAlign="left">
            <Form
              // onBlur={autoSaveDebounce}
              style={{ width: "100%" }}
            >
              <Text
                variant="baseline"
                fontWeight="bold"
                textAlign="left"
                _hover={{ cursor: "pointer" }}
                mb="5"
              >
                Edition de la page d'accueil
              </Text>
              <TitleDivider title="Bandeau" />
              <Box
                border="1px solid #F7F7F7F7"
                p="5"
                backgroundColor="#fdfdfdf1"
              >
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
                <Text variant="currentBold" mt="5">
                  {t.label_logo}
                </Text>
                <UploadFile
                  onChange={logOnChange}
                  label={t.logo_cta}
                  id="logo"
                  helpText={t.logo_helptext}
                />

                <Text variant="currentBold" mt={9}>
                  {t.theme_label}
                </Text>
                <ColorPicker />
              </Box>

              <TitleDivider title="Corps" />
              <Box
                border="1px solid #F7F7F7F7"
                p="5"
                backgroundColor="#fdfdfdf1"
              >
                <Text variant="currentBold" mt={2} mb={2}>
                  {t.content_label}
                </Text>
                <Wysiwyg id="wysiwyg" simpleMode />

                <Text variant="currentBold" mt="5">
                  {t.add_image}
                </Text>
                <UploadFile
                  onChange={logOnChange}
                  label={t.image_cta}
                  id="cover"
                  helpText={t.logo_helptext}
                />

                <Flex alignItems="center">
                  <Textarea
                    id="video_url"
                    rows="small"
                    placeholder={t.video_url_placeholder}
                    label={t.video_url_label}
                    isDisabled={Boolean(values.cover)}
                  />
                  <Box mt={7} ml={4}>
                    <SvgHover>
                      <Delete onClick={onDeleteVideo} />
                    </SvgHover>
                  </Box>
                </Flex>
                <Text variant="currentBold" mt="5">
                  {t.see_more_cta}
                </Text>
                <Button
                  variant="roundedTransparent"
                  mt={4}
                  onClick={onEditAbout}
                >
                  {t.cta_show_more}
                </Button>
              </Box>

              <TitleDivider title="Pied de page" />
              <Box
                border="1px solid #F7F7F7F7"
                p="5"
                backgroundColor="#fdfdfdf1"
                mb="100px"
              >
                <RepeatableJobs
                  name="members"
                  cta="Ajouter un membre de l'équipe"
                />

                <RepeatableJobs
                  name="partners_logos"
                  onlyUpload
                  cta="Ajouter un logo partenaire"
                />
              </Box>

              <Footer
                w="43%"
                onSubmit={() => onSave()}
                disabled={!isValid || isSubmitting}
                onCancel={handleCancel}
                hideDelete={true}
              />
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};
