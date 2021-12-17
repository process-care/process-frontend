import { Box, Button, Text, Container, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { UploadFileRemote } from "components/Fields/UploadFileRemote";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form } from "formik";
import React, { useCallback, useMemo, useRef } from "react";

import { t } from "static/createLanding";
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RepeatableFields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/RepeatableFields";
import { SvgHover } from "components/SvgHover";

import { ReactComponent as Delete } from "assets/delete.svg";
import { goTop } from "utils/application/scrollTo";
import { actions, selectors } from "redux/slices/landing-editor";

export const LandingForm: React.FC = () => {
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

  return (
    <Formik
      validateOnBlur={false}
      initialValues={data || initialValues}
      // enableReinitialize
      onSubmit={onSubmit}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      {(formProps) => {
        const { values, setFieldValue } = formProps;

        // Handle update value
        React.useEffect(() => {
          if (firstRender.current) {
            firstRender.current = false;
            return;
          }

          dispatch(actions.update({ ...values }));
        }, [values]);

        // Target params for various uploads (cover, partners)
        const targets = useMemo(() => {
          const base = { refId: values.id, ref: "landing" };
          return {
            partners: { ...base, field: "partners" },
            cover: { ...base, field: "cover" },
          };
        }, [values.id]);

        // Delete video handler
        const onDeleteVideo = useCallback(() => {
          dispatch(actions.update({ video_url: "" }));
          setFieldValue("video_url", "");
        }, []);

        // Components
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
              // onBlur={autoSaveDebounce}
              style={{ width: "100%" }}
            >
              <Text variant="currentBold">{t.label_logo}</Text>
              <UploadFile
                // QUESTION: console log only ?
                onChange={logOnChange}
                label={t.logo_cta}
                id="logo"
                helpText={t.logo_helptext}
              />
              <UploadFile
                // QUESTION: console log only ?
                onChange={logOnChange}
                label={t.logo_cta}
                id="cover"
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
              <Wysiwyg id="wysiwyg" simpleMode />

              <Container variant="hr" my={10} />

              <Text variant="currentBold">{t.add_image}</Text>
              {/* <UploadFile
                onChange={logOnChange}
                label={t.logo_cta}
                id="cover"
                helpText={t.logo_helptext}
              /> */}
              {/* TODO: Fix when api is ready */}
              {/* <UploadFileRemote
                accept=".png,.jpeg"
                target={targets.cover}
                content={values.cover}
                label={t.image_cta}
                helpText={t.image_helptext}
                isDisabled={Boolean(values.video_url)}
                // QUESTION: console log only ?
                onChange={logOnChange}
              /> */}

              <Flex alignItems="center">
                <Textarea
                  id="video_url"
                  rows="small"
                  placeholder={t.video_url_placeholder}
                  label={t.video_url_label}
                  isDisabled={Boolean(values.image_cover)}
                />
                <Box mt={7} ml={4}>
                  <SvgHover>
                    <Delete onClick={onDeleteVideo} />
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
              <UploadFileRemote
                accept=".png,.jpeg"
                target={targets.partners}
                content={values.partners}
                label={t.logos_cta}
                helpText={t.image_helptext}
                multiple
                // QUESTION: console log only ?
                onChange={logOnChange}
              />

              <Container variant="hr" my={10} />

              <Text variant="currentBold">{t.see_more_cta}</Text>
              <Button
                variant="roundedTransparent"
                mt={4}
                mb="100px"
                onClick={onEditAbout}
              >
                {t.see_more_cta}
              </Button>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};
