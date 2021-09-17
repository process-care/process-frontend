import { Box, Button, Text, Container, Flex } from "@chakra-ui/react";
import { Textarea } from "components/Fields";
import { UploadFile } from "components/Fields/Uploadfile";
import { UploadFileRemote } from "components/Fields/UploadFileRemote";
import { Wysiwyg } from "components/Fields/Wysiwyg";
import { Formik, Form, FormikProps } from "formik";
import React, { useEffect, useMemo } from "react";
import { setEditAboutPage } from "redux/slices/landingBuilder";
import { debounce } from "lodash";

import { t } from "static/createLanding";
import { ColorPicker } from "../ColorPicker";
import { initialValues } from "./utils/initialValues";
import { useAppDispatch } from "redux/hooks";
import { RepeatableFields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/RepeatableFields";
import { SvgHover } from "components/SvgHover";

import { ReactComponent as Delete } from "assets/delete.svg";
import { goTop } from "utils/application/scrollTo";
import { ILanding } from "types/landing";
import { useUpdateLanding } from "call/actions/landing";
import { setAutoSave } from "redux/slices/application";
import { FormikObserver } from "./FormikObserver";

interface Props {
  data: ILanding;
}

export const LandingForm: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { mutateAsync: updateLanding } = useUpdateLanding();

  // const onChange = (event: React.FormEvent<HTMLFormElement>) => {
  //   const target = event.target as HTMLFormElement;
  //   const is_repeated_fields = target.id.includes("members");

  //   if (target.type === "file" || is_repeated_fields) {
  //     return false;
  //   } else if (target !== null) {
  //     updateLanding({
  //       id: data.id,
  //       data: {
  //         [target.id]: target.value,
  //       },
  //     });
  //   }
  // };

  const handleUpdate = (values: any) => {
    updateLanding({
      id: data.id,
      data: {
        title: values.title,
      },
    });
  };

  const autoSave = () => {
    dispatch(setAutoSave());
    setTimeout(() => {
      dispatch(setAutoSave());
    }, 2000);
  };
  const autoSaveDebounce = debounce(autoSave, 500);

  return (
    <Formik
      validateOnBlur={false}
      // initialValues={data || initialValues}
      initialValues={initialValues}
      // enableReinitialize
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      {(formProps) => {
        const { values, setFieldValue } = formProps;

        // Target params for various uploads (cover, partners)
        const targets = useMemo(() => {
          const base = { refId: values.id, ref: "landing" };
          return {
            partners: { ...base, field: "partners" },
            cover: { ...base, field: "cover" },
          };
        }, [values.id]);

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
              // onChange={(event) => onChange(event)}
              onBlur={autoSaveDebounce}
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
              <Wysiwyg id="wysiwyg" simpleMode />

              <Container variant="hr" my={10} />

              <Text variant="currentBold">{t.add_image}</Text>
              <UploadFileRemote
                accept=".png,.jpeg"
                target={targets.cover}
                content={values.cover}
                label={t.image_cta}
                helpText={t.image_helptext}
                isDisabled={Boolean(values.video_url)}
                onChange={(e) => console.log(e)}
              />

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
              <UploadFileRemote
                accept=".png,.jpeg"
                target={targets.partners}
                content={values.partners}
                label={t.logos_cta}
                helpText={t.image_helptext}
                multiple
                onChange={(e) => console.log(e)}
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
            </Form>
            <FormikObserver
              value={formProps?.values}
              onChange={(v) => handleUpdate(v)}
            />
          </Box>
        );
      }}
    </Formik>
  );
};
