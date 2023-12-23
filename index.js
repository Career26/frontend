var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import { Amplify } from "aws-amplify";
import { Notifications } from "@mantine/notifications";

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-WDH4LBXJ.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Provider } from "react-redux";
import { Authenticator } from "@aws-amplify/ui-react";

// app/shared/components/feedback/FeedbackModal.tsx
import { Group as Group2, Text as Text2 } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";

// app/state/slices/sessionSlice.ts
import { createSelector, createSlice } from "@reduxjs/toolkit";

// app/state/apis/questionsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

// app/shared/utils/apiUtil.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth } from "aws-amplify";

// app/shared/constants/urlConstants.ts
var urls = {
  landingPage: "/",
  careersTest: "/career-test",
  overview: "/overview",
  questions: "/questions",
  mentors: "/mentors",
  settings: "/settings",
  jobs: "/jobs",
  linkedIn: "https://linkedin.com/company/100135742/admin/feed/posts/"
}, contactEmail = "career26.info@gmail.com";
var prodUrl = "https://z3mda8e0qg.execute-api.eu-west-1.amazonaws.com/Prod", getBaseUrl = () => prodUrl, baseUrl = getBaseUrl();

// app/shared/utils/apiUtil.ts
var getAuthorisedBaseQuery = (unauthorisedEndpoints2) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, api) => {
    if (unauthorisedEndpoints2?.includes(api.endpoint))
      return headers;
    let token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return headers.set("Authorization", token), headers;
  }
});

// app/state/apis/questionsApi.ts
var questionsApi = createApi({
  reducerPath: "questions",
  baseQuery: getAuthorisedBaseQuery(),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: () => "questions"
    }),
    getSuggestion: build.mutation({
      query: (body) => ({
        url: "suggestion",
        method: "POST",
        body
      })
    }),
    rateAnswer: build.mutation({
      query: (body) => ({
        url: "rate",
        method: "POST",
        body
      })
    })
  })
}), { useGetQuestionsQuery, useRateAnswerMutation, useGetSuggestionMutation } = questionsApi, selectInterviewQuestions = (state) => questionsApi.endpoints.getQuestions.select()(state).data, selectSuggestion = (state, fixedCacheKey) => questionsApi.endpoints.getSuggestion.select({
  fixedCacheKey,
  requestId: void 0
})(state).data, questionsApi_default = questionsApi.reducer;

// app/state/apis/profileApi.ts
import { createApi as createApi2 } from "@reduxjs/toolkit/query/react";
var unauthorisedEndpoints = ["selectCareer", "createProfile"], profileApi = createApi2({
  reducerPath: "profile",
  baseQuery: getAuthorisedBaseQuery(unauthorisedEndpoints),
  endpoints: (build) => ({
    createProfile: build.mutation({
      query: (body) => ({
        url: "profile",
        method: "POST",
        body
      })
    }),
    selectCareer: build.mutation({
      query: (body) => ({
        url: "select",
        method: "POST",
        body
      })
    }),
    getProfile: build.query({
      query: () => "profile"
    }),
    associateProfile: build.query({
      query: (profileId) => `associate/${profileId}`
    })
  })
}), {
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useSelectCareerMutation,
  useLazyAssociateProfileQuery
} = profileApi, selectProfileState = (state) => profileApi.endpoints.getProfile.select()(state).data, selectProfile = (state) => selectProfileState(state)?.profile, selectCareerPaths = (state) => selectProfileState(state)?.careerPaths, selectProfileId = (state) => selectProfileState(state)?.identifier, profileApi_default = profileApi.reducer;

// app/shared/constants/careerConstants.ts
var careerColors = [
  "pink",
  "orange",
  "green",
  "dark",
  "red",
  "purple",
  "yellow",
  "blue",
  "teal",
  "grape",
  "violet",
  "indigo",
  "cyan",
  "lime"
];

// app/shared/utils/colorUtil.ts
var getColorsObject = ({
  initialColors,
  industries
}) => industries.reduce(
  (agg, industry) => {
    if (agg[industry])
      return agg;
    let newColor = careerColors[Object.keys(agg).length];
    return { ...agg, [industry]: newColor };
  },
  { ...initialColors }
);

// app/state/slices/sessionSlice.ts
var initialSessionState = {
  industryColors: {},
  questionColors: {},
  selectedQuestionId: void 0,
  loginModal: { open: !1 },
  feedbackModal: { open: !1 },
  careerTestModal: { open: !1 },
  diversityModal: { open: !1 }
}, sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionState,
  reducers: {
    setDiversityModal: (state, { payload }) => {
      state.diversityModal = payload;
    },
    setCareerTestModal: (state, { payload }) => {
      state.careerTestModal = payload;
    },
    setLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },
    setFeedbackModal: (state, { payload }) => {
      state.feedbackModal = payload;
    },
    setSelectedCareerPathId: (state, { payload }) => {
      state.selectedCareerPathId = payload;
    },
    setSelectedQuestionId: (state, { payload }) => {
      state.selectedQuestionId = payload;
    },
    addIndustryColors: (state, { payload: industries }) => {
      let industryColors = getColorsObject({
        initialColors: { ...state.industryColors },
        industries
      });
      state.industryColors = industryColors;
    },
    addQuestionColors: (state, { payload: categories }) => {
      let questionColors = getColorsObject({
        initialColors: { ...state.questionColors },
        industries: categories
      });
      state.questionColors = questionColors;
    },
    resetSession: () => initialSessionState
  }
}), {
  setLoginModal,
  setSelectedCareerPathId,
  resetSession,
  addIndustryColors,
  addQuestionColors,
  setSelectedQuestionId,
  setFeedbackModal,
  setCareerTestModal,
  setDiversityModal
} = sessionSlice.actions, selectSession = (state) => state.session, selectSelectedQuestionId = (state) => selectSession(state).selectedQuestionId || 0, selectSelectedQuestion = (state) => {
  let questions = selectInterviewQuestions(state), id = selectSelectedQuestionId(state);
  return questions?.[id];
}, selectLoginModal = (state) => selectSession(state).loginModal;
var selectCareerTestModal = (state) => selectSession(state).careerTestModal, selectFeedbackModal = (state) => selectSession(state).feedbackModal, selectSelectedCareerPathId = (state) => selectSession(state).selectedCareerPathId || Object.keys(selectCareerPaths(state) || {})[0], selectSelectedCareerPath = createSelector(
  [selectSelectedCareerPathId, selectCareerPaths],
  (id, careerPaths) => {
    if (!(!id || !careerPaths))
      return careerPaths[id];
  }
), selectIndustryColors = (state) => selectSession(state).industryColors, selectQuestionColors = (state) => selectSession(state).questionColors, sessionSlice_default = sessionSlice.reducer;

// app/state/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// app/state/apis/overviewApi.ts
import { createApi as createApi3, fetchBaseQuery as fetchBaseQuery2 } from "@reduxjs/toolkit/query/react";
var overviewApi = createApi3({
  reducerPath: "overview",
  baseQuery: fetchBaseQuery2({ baseUrl }),
  endpoints: (build) => ({
    getCareerOverview: build.query({
      query: ({ careerId, profileId }) => `overview/${profileId}/${careerId}`
    })
  })
}), { useGetCareerOverviewQuery } = overviewApi, overviewApi_default = overviewApi.reducer;

// app/state/apis/feedbackApi.ts
import { createApi as createApi4, fetchBaseQuery as fetchBaseQuery3 } from "@reduxjs/toolkit/query/react";
var feedbackApi = createApi4({
  reducerPath: "feedback",
  baseQuery: fetchBaseQuery3({ baseUrl }),
  endpoints: (build) => ({
    submitFeedback: build.mutation({
      query: (body) => ({ url: "feedback", method: "POST", body })
    })
  })
}), { useSubmitFeedbackMutation } = feedbackApi, feedbackApi_default = feedbackApi.reducer;

// app/state/store.ts
var rootReducer = combineReducers({
  session: sessionSlice_default,
  [questionsApi.reducerPath]: questionsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer
}), store = configureStore({
  reducer: {
    session: sessionSlice_default,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: !1 }).concat([
    questionsApi.middleware,
    profileApi.middleware,
    overviewApi.middleware,
    feedbackApi.middleware
  ])
}), useAppDispatch = useDispatch, useAppSelector = useSelector;

// app/shared/components/feedback/FeedbackForm.tsx
import { Checkbox, Grid, Radio, Text, Textarea } from "@mantine/core";

// app/shared/utils/formUtil.ts
var getPrefix = (rating) => {
  switch (rating) {
    case "I hated it":
      return "Why did you hate it?";
    case "I disliked it":
      return "Why did you dislike it?";
    case "I liked it":
      return "Why did you like it?";
    case "I loved it":
      return "Why did you love it?";
    default:
      return "Provide a reason for this rating";
  }
}, getCharacterCount = (prefix, answerLength = 0) => `${prefix} (${500 - answerLength} characters remaining)`, getRatingLabel = (rating, answerLength = 0) => {
  let prefix = getPrefix(rating);
  return getCharacterCount(prefix, answerLength);
};

// app/shared/components/feedback/feedbackConstants.ts
var heardFromOptions = [
  "Search engine (Google, Bing, etc.)",
  "Recommended by a friend of colleague",
  "Direct Email",
  "Conference",
  "LinkedIn",
  "Wechat",
  "Other"
], mostHelpfulOptions = [
  "Career Test",
  "Industry Insights",
  "Interview Preparation",
  "Other",
  "Nothing"
], experienceRatingOptions = [
  "Very helpful",
  "Somewhat helpful",
  "Neutral",
  "Not helpful"
];

// app/shared/components/feedback/feedback.module.css
var feedback_module_default = { radioGroup: "jtqZK" };

// app/shared/components/feedback/FeedbackForm.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var FeedbackForm = ({ form }) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(Text, { py: "md", children: "Career26 is always looking to improve. If you have feedback or thoughts on how we can help you better, then we'd love to hear from you." }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2(
      Checkbox.Group,
      {
        ...form.getInputProps("heardFrom"),
        label: "How did you heard about us?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2(Grid, { py: "xs", children: heardFromOptions.map(
          (label) => /* @__PURE__ */ jsx2(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx2(Checkbox, { label, value: label }) }, `heard-from-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Checkbox.Group,
      {
        ...form.getInputProps("mostHelpful"),
        label: "What feature did you find the most helpful?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2(Grid, { py: "xs", children: mostHelpfulOptions.map(
          (label) => /* @__PURE__ */ jsx2(Grid.Col, { span: 6, children: /* @__PURE__ */ jsx2(Checkbox, { label, value: label }) }, `most-helpful-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Radio.Group,
      {
        ...form.getInputProps("experienceRating"),
        name: "experienceRating",
        label: "How would you rate you Career26 experience?",
        withAsterisk: !0,
        py: "md",
        children: /* @__PURE__ */ jsx2("div", { className: feedback_module_default.radioGroup, children: experienceRatingOptions.map(
          (label) => /* @__PURE__ */ jsx2(Radio, { value: label, label, py: "xs" }, `experience-${label}`)
        ) })
      }
    ),
    /* @__PURE__ */ jsx2(
      Textarea,
      {
        ...form.getInputProps("otherFunctions"),
        label: getCharacterCount(
          "Are there any other functions that you would like Career26 to have in the future?",
          form.values.otherFunctions?.length
        ),
        minRows: 3,
        autosize: !0,
        placeholder: "Enter your message here"
      }
    )
  ] })
] });

// app/shared/components/actionModal/ActionModal.tsx
import { Button, Group, Modal } from "@mantine/core";

// app/shared/components/actionModal/actionModal.module.css
var actionModal_module_default = { footer: "NQvX3" };

// app/shared/components/actionModal/ActionModal.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ActionModal = ({
  opened,
  onClick,
  onClose,
  disabled,
  body,
  loading,
  label,
  title
}) => /* @__PURE__ */ jsxs2(Modal.Root, { opened, onClose, size: "xl", centered: !0, children: [
  /* @__PURE__ */ jsx3(Modal.Overlay, {}),
  /* @__PURE__ */ jsxs2(Modal.Content, { children: [
    /* @__PURE__ */ jsxs2(Modal.Header, { bg: "navy", c: "white", children: [
      /* @__PURE__ */ jsx3(Modal.Title, { fw: "bold", children: title }),
      /* @__PURE__ */ jsx3(Modal.CloseButton, { c: "white" })
    ] }),
    /* @__PURE__ */ jsx3(Modal.Body, { children: body }),
    /* @__PURE__ */ jsx3(Group, { justify: "center", py: "md", className: actionModal_module_default.footer, children: /* @__PURE__ */ jsx3(Button, { disabled, loading, onClick, variant: "outline", children: label }) })
  ] })
] });

// app/shared/components/feedback/FeedbackModal.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var hasAnswer = (value) => !value?.length && "Please provide an answer", FeedbackModal = () => {
  let dispatch = useAppDispatch(), { open } = useAppSelector(selectFeedbackModal), [submitFeedback, { isLoading, data, reset }] = useSubmitFeedbackMutation(), form = useForm({
    initialValues: {
      heardFrom: [],
      mostHelpful: [],
      experienceRating: ""
    },
    validate: {
      heardFrom: hasAnswer,
      mostHelpful: hasAnswer,
      experienceRating: hasAnswer,
      otherFunctions: (value) => {
        if (!(!value || value.length <= 500))
          return "Feedback must be 500 characters or less";
      }
    }
  }), onClose = () => {
    dispatch(setFeedbackModal({ open: !1 })), reset(), form.reset();
  };
  return useEffect(() => {
    data && setTimeout(onClose, 2e3);
  }, [data]), /* @__PURE__ */ jsx4(
    ActionModal,
    {
      label: "Submit",
      title: "Feedback",
      opened: open,
      onClose,
      body: data ? /* @__PURE__ */ jsxs3(Group2, { py: "md", children: [
        /* @__PURE__ */ jsx4(IconCircleCheck, { color: "green", size: 50 }),
        /* @__PURE__ */ jsx4(Text2, { children: "Thank you for providing feedback!" })
      ] }) : /* @__PURE__ */ jsx4(FeedbackForm, { form }),
      disabled: !!Object.values(form.errors).length,
      loading: isLoading,
      onClick: () => submitFeedback(form.values)
    }
  );
};

// app/shared/components/careerTestModal/CareerTestModal.tsx
import { Container, Text as Text3 } from "@mantine/core";

// app/shared/hooks/usePageNavigation.ts
import { useLocation, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
var usePageNavigation = () => {
  let navigate = useNavigate(), dispatch = useAppDispatch(), { pathname: currentPathname } = useLocation(), careerId = useAppSelector(selectSelectedCareerPathId), featureUrl = useMemo(() => {
    if (new RegExp(urls.questions).test(currentPathname))
      return urls.questions;
    if (new RegExp(urls.overview).test(currentPathname))
      return urls.overview;
  }, [currentPathname, navigate]);
  return {
    goToHomepage: () => {
      navigate(urls.landingPage);
    },
    goToSettings: () => {
      navigate(urls.settings);
    },
    clickCareersTest: () => {
      navigate(urls.careersTest);
    },
    toggleCareerId: (newCareerId) => {
      let newPathname = currentPathname.replace(
        new RegExp(`${featureUrl}/(.*)`),
        `${featureUrl}/${newCareerId}`
      );
      navigate(newPathname), dispatch(setSelectedCareerPathId(newCareerId));
    },
    toggleQuestionId: (newQuestionId) => {
      let newPathname = currentPathname.replace(
        new RegExp(`${featureUrl}/${careerId}/(.*)`),
        `${featureUrl}/${careerId}/${newQuestionId}`
      );
      navigate(newPathname), dispatch(setSelectedQuestionId(newQuestionId));
    },
    showNavigation: !!featureUrl,
    featureUrl,
    currentPathname
  };
};

// app/shared/components/careerTestModal/careerTestModal.module.css
var careerTestModal_module_default = { container: "ag2ez" };

// app/shared/components/careerTestModal/CareerTestModal.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var NoProfileBody = () => /* @__PURE__ */ jsxs4(Container, { py: "md", className: careerTestModal_module_default.container, children: [
  /* @__PURE__ */ jsx5(Text3, { py: "md", children: "We provide personalised career guidance based on your Career26 test results." }),
  /* @__PURE__ */ jsx5(Text3, { py: "md", fw: "bold", children: "Take the Career26 Test now, it takes less than 5 minutes!" })
] }), TimeTakenBody = () => /* @__PURE__ */ jsxs4(Container, { py: "md", className: careerTestModal_module_default.container, children: [
  /* @__PURE__ */ jsx5(Text3, { py: "md", children: "This test takes less than 5 minutes." }),
  /* @__PURE__ */ jsx5(Text3, { py: "md", fw: "bold", children: "The more detail you provide, the more accurate the results will be." })
] }), CareerTestModal = () => {
  let dispatch = useAppDispatch(), { open, noProfile } = useAppSelector(selectCareerTestModal), { clickCareersTest } = usePageNavigation(), onClose = () => {
    dispatch(setCareerTestModal({ open: !1 }));
  };
  return /* @__PURE__ */ jsx5(
    ActionModal,
    {
      title: "Build your Career Profile",
      opened: open,
      onClose,
      label: "Take the Test Now!",
      onClick: () => {
        clickCareersTest(), onClose();
      },
      body: /* @__PURE__ */ jsx5(noProfile ? NoProfileBody : TimeTakenBody, {})
    }
  );
};

// app/root.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var meta = () => [{ title: "Career26" }, { name: "description", content: "Discover your perfect career!" }], loader = async () => ({
  userPoolId: process?.env?.PROD_USER_POOL,
  userPoolWebClientId: process?.env?.PROD_CLIENT_ID
}), links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  let { userPoolWebClientId, userPoolId } = useLoaderData();
  return Amplify.configure({
    Auth: {
      region: "eu-west-1",
      userPoolId,
      userPoolWebClientId
    }
  }), /* @__PURE__ */ jsxs5("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs5("head", { children: [
      /* @__PURE__ */ jsx6("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx6("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx6(Meta, {}),
      /* @__PURE__ */ jsx6(Links, {}),
      /* @__PURE__ */ jsx6(ColorSchemeScript, {})
    ] }),
    /* @__PURE__ */ jsx6("body", { children: /* @__PURE__ */ jsx6(Provider, { store, children: /* @__PURE__ */ jsx6(Authenticator.Provider, { children: /* @__PURE__ */ jsxs5(
      MantineProvider,
      {
        theme: {
          breakpoints: {
            xs: "30em",
            sm: "48em",
            md: "64em",
            lg: "74em",
            xl: "90em"
          },
          primaryColor: "navy",
          primaryShade: 5,
          colors: {
            navy: [
              "#f1f7ff",
              "#7e9bcd",
              "#7595c7",
              "#6c8ec1",
              "#0d3978",
              "#0b356e",
              "#093364",
              "#07305a",
              "#052d50",
              "#042a4a"
            ]
          }
        },
        children: [
          /* @__PURE__ */ jsx6(Notifications, {}),
          /* @__PURE__ */ jsx6(Outlet, {}),
          /* @__PURE__ */ jsx6(ScrollRestoration, {}),
          /* @__PURE__ */ jsx6(Scripts, {}),
          /* @__PURE__ */ jsx6(LiveReload, {}),
          /* @__PURE__ */ jsx6(FeedbackModal, {}),
          /* @__PURE__ */ jsx6(CareerTestModal, {})
        ]
      }
    ) }) }) })
  ] });
}

// app/routes/career-test.tsx
var career_test_exports = {};
__export(career_test_exports, {
  default: () => career_test_default
});
import { useEffect as useEffect8, useMemo as useMemo5, useState as useState5 } from "react";
import { Container as Container8, Group as Group9, Button as Button6, Stepper } from "@mantine/core";
import { notifications as notifications3 } from "@mantine/notifications";

// app/shared/constants/formConstants.ts
import { IconCurrencyDollar, IconCurrencyPound, IconCurrencyYen } from "@tabler/icons-react";

// app/datatypes/profile.ts
var WorkStyle = /* @__PURE__ */ ((WorkStyle2) => (WorkStyle2["I prefer working in a team"] = "TEAM", WorkStyle2["I prefer working independently"] = "INDEPENDENT", WorkStyle2["I have no preference"] = "BOTH", WorkStyle2))(WorkStyle || {}), WorkValue = /* @__PURE__ */ ((WorkValue2) => (WorkValue2["Higher salary"] = "SALARY", WorkValue2["Work-life balance"] = "BALANCE", WorkValue2["I have no preference"] = "ANY", WorkValue2))(WorkValue || {}), ExperienceType = /* @__PURE__ */ ((ExperienceType2) => (ExperienceType2.Company = "COMPANY", ExperienceType2.Project = "PROJECT", ExperienceType2.Society = "SOCIETY", ExperienceType2.Volunteering = "VOLUNTEERING", ExperienceType2.Other = "OTHER", ExperienceType2))(ExperienceType || {}), YesNoPreferNotToSay = /* @__PURE__ */ ((YesNoPreferNotToSay2) => (YesNoPreferNotToSay2.Yes = "YES", YesNoPreferNotToSay2.No = "NO", YesNoPreferNotToSay2["Prefer not to say"] = "PREFER_NOT_TO_SAY", YesNoPreferNotToSay2))(YesNoPreferNotToSay || {}), SchoolType = /* @__PURE__ */ ((SchoolType2) => (SchoolType2["State-funded"] = "STATE", SchoolType2["State-funded grammar/selective"] = "GRAMMAR", SchoolType2["Independent/private school (fee paying)"] = "INDEPENDENT", SchoolType2["Prefer not to say"] = "PREFER_NOT_TO_SAY", SchoolType2))(SchoolType || {}), Ethnicity = /* @__PURE__ */ ((Ethnicity2) => (Ethnicity2.White = "WHITE", Ethnicity2["Black, Black British, Carribbean or African"] = "BLACK", Ethnicity2["Asian or Asian British"] = "ASIAN", Ethnicity2["Mixed or multiple ethnic groups"] = "MIXED", Ethnicity2["Other ethnic group"] = "OTHER", Ethnicity2["Prefer not to say"] = "PREFER_NOT_TO_SAY", Ethnicity2))(Ethnicity || {}), Gender = /* @__PURE__ */ ((Gender2) => (Gender2.Male = "MALE", Gender2.Female = "FEMALE", Gender2["Non-binary"] = "NON_BINARY", Gender2.Other = "OTHER", Gender2["Prefer not to say"] = "PREFER_NOT_TO_SAY", Gender2))(Gender || {});

// app/shared/constants/formConstants.ts
var exampleCities = [
  {
    value: "London",
    label: "London",
    baseCurrency: "GBP",
    Icon: IconCurrencyPound
  },
  {
    value: "New York",
    label: "New York",
    baseCurrency: "USD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Tokyo",
    label: "Tokyo",
    baseCurrency: "JPY",
    Icon: IconCurrencyYen
  },
  {
    value: "Sydney",
    label: "Sydney",
    baseCurrency: "AUD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Hong Kong",
    label: "Hong Kong",
    baseCurrency: "HKD",
    Icon: IconCurrencyDollar
  },
  {
    value: "Shanghai",
    label: "Shanghai",
    baseCurrency: "RMB",
    Icon: IconCurrencyYen
  }
], exampleAreasOfInterest = [
  "Finance",
  "Business",
  "Law",
  "Consulting",
  "Education",
  "Technology",
  "Healthcare",
  "Charity",
  "Art and Creative Work",
  "Politics",
  "Public Services",
  "Academia / Research"
], experienceOptions = Object.entries(ExperienceType).map(([label, value]) => ({
  label,
  value
})), workStyleOptions = Object.entries(WorkStyle).map(([label, value]) => ({
  label,
  value
})), workLifeOptions = Object.entries(WorkValue).map(([label, value]) => ({
  label,
  value
})), ratingOptions = [
  "I hated it",
  "I disliked it",
  "I neither liked or disliked it",
  "I liked it",
  "I loved it"
], ukDegreeGrades = [
  "First Class (1st)",
  "Second Class Upper (2:1)",
  "Second Class Lower (2:2)",
  "Third Class (3rd)"
], usDegreeGrades = [
  "GPA 3.8 - 4.0",
  "GPA 3.3 - 3.7",
  "GPA 2.7 - 3.2",
  "GPA 2.0 - 2.6",
  "GPA 1.0 - 1.9"
], otherGrades = ["Distinction", "Merit", "Pass", "N/A"], degreeLevels = ["PhD", "MSc", "MA", "BSc", "BA", "MEng", "BEng"], degreeOptions = [
  { group: "UK Grading", items: ukDegreeGrades },
  { group: "US Grading", items: usDegreeGrades },
  { group: "Other", items: otherGrades }
], initialUniversityValues = {
  grade: "",
  level: "",
  name: "",
  university: "",
  rating: "",
  ratingReason: ""
}, initialWorkExperienceValues = {
  experienceName: "",
  experienceType: "COMPANY" /* Company */,
  rating: "",
  ratingReason: "",
  role: ""
}, initialProfileValues = {
  additionalDegrees: [],
  areasOfInterest: [],
  expectedSalary: {
    baseCurrency: "GBP",
    city: "London",
    expectedSalary: 4e4
  },
  personalityType: {
    workValue: "SALARY" /* Higher salary */,
    workStyle: "INDEPENDENT" /* I prefer working independently */
  },
  latestDegree: initialUniversityValues,
  previousWorkExperience: [initialWorkExperienceValues],
  diversity: {
    firstGeneration: void 0,
    schoolType: void 0,
    ethnicity: void 0,
    gender: void 0,
    age: void 0
  }
}, careerLoadingText = [
  "Generating your personalised career suggestions...",
  "This may take up to 30 seconds...",
  "You're almost there..."
];

// app/shared/hooks/useCareerTestStorage.ts
var baseKey = "careerTest", initialStoredValues = {
  step: 0 /* EDUCATION */,
  formValues: initialProfileValues
}, useCareerTestStorage = () => {
  let getValues = () => {
    if (typeof localStorage > "u")
      return initialStoredValues;
    let storedValues = localStorage.getItem(baseKey);
    return storedValues ? JSON.parse(storedValues) : initialStoredValues;
  }, storeTestValues = ({
    key,
    value
  }) => {
    if (typeof localStorage > "u")
      return;
    let newValues = { ...getValues(), [key]: value };
    localStorage.setItem(baseKey, JSON.stringify(newValues));
  };
  return {
    resetValues: () => {
      typeof localStorage > "u" || localStorage.setItem(baseKey, JSON.stringify(initialStoredValues));
    },
    storeTestValues,
    setupFormValues: ({ profile, careerPaths }) => {
      storeTestValues({ key: "formValues", value: profile }), storeTestValues({ key: "careerPaths", value: careerPaths }), storeTestValues({ key: "step", value: 5 /* COMPLETE */ });
    },
    careerTestStorage: getValues()
  };
};

// app/shared/hooks/useAuthUser.ts
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth as Auth2 } from "aws-amplify";
import { useEffect as useEffect2, useState } from "react";
import { notifications } from "@mantine/notifications";
var useAuthUser = () => {
  let [loading, setLoading] = useState(!1), dispatch = useAppDispatch(), { goToHomepage } = usePageNavigation(), { open, associateProfileId } = useAppSelector(selectLoginModal), { resetValues } = useCareerTestStorage(), { signOut, user, authStatus } = useAuthenticator((context) => [context.route]), authenticated = authStatus === "authenticated", unauthenticated = authStatus === "unauthenticated";
  return useEffect2(() => {
    authenticated && open && !associateProfileId && dispatch(setLoginModal({ open: !1 }));
  }, [authenticated, open, associateProfileId]), {
    loading: loading || authStatus === "configuring",
    unauthenticated,
    authenticated,
    user,
    signOut,
    updateUserAttributes: async (attributes) => {
      setLoading(!0);
      try {
        let authUser = await Auth2.currentAuthenticatedUser();
        await Auth2.updateUserAttributes(authUser, attributes), notifications.show({
          title: "Updated Account",
          message: "Successfully updated profile details",
          color: "green"
        });
      } catch (error) {
        console.error(`update account error - ${error}`), notifications.show({
          title: "Update Failed",
          message: "Could not update profile details",
          color: "red"
        });
      }
      setLoading(!1);
    },
    deleteAccount: async () => {
      setLoading(!0);
      try {
        await Auth2.deleteUser(), notifications.show({
          title: "Deleted Account",
          message: "Successfully deleted profile",
          color: "green"
        }), resetValues(), goToHomepage(), dispatch(resetSession());
      } catch (error) {
        console.error(`delete account error - ${error}`), notifications.show({
          title: "Delete Failed",
          message: "Could not delete profile",
          color: "red"
        });
      }
      setLoading(!1);
    }
  };
};

// app/shared/hooks/useMobileStyles.ts
import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
var useMobileStyles = () => ({
  isMobile: useMediaQuery(`(max-width: ${em(750)})`),
  mobileWidth: "sm"
});

// app/shared/hooks/useAssociate.ts
import { notifications as notifications2 } from "@mantine/notifications";
var useAssociate = () => {
  let [associateProfileQuery, { isFetching }] = useLazyAssociateProfileQuery(), { goToHomepage } = usePageNavigation();
  return { associateProfile: async (profileId, onSuccess) => {
    try {
      await associateProfileQuery(profileId), notifications2.show({
        title: "Created Account",
        message: "Successfully created account",
        color: "green"
      }), onSuccess?.(), goToHomepage(), window?.location?.reload();
    } catch (error) {
      console.error(`associate account error - ${error}`);
    }
  }, loading: isFetching };
};

// app/features/careerTest/useCareerTestForm.ts
import { useMemo as useMemo2 } from "react";
import { FORM_INDEX, useForm as useForm2 } from "@mantine/form";
var useCareerTestForm = ({ activeStep }) => {
  let {
    careerTestStorage: { formValues }
  } = useCareerTestStorage(), fieldsToCheck = useMemo2(() => {
    if (activeStep === 0 /* EDUCATION */)
      return ["latestDegree", "additionalDegrees", `additionalDegrees.${FORM_INDEX}`];
    if (activeStep === 1 /* WORK_EXPERIENCE */)
      return ["previousWorkExperience", `previousWorkExperience.${FORM_INDEX}`];
    if (activeStep === 2 /* PREFERENCES */)
      return ["areasOfInterest", "expectedSalary"];
  }, [activeStep]), form = useForm2({
    initialValues: formValues,
    validateInputOnChange: !0,
    validate: {
      latestDegree: {
        name: (value) => !value && "Course name is required",
        university: (value) => !value && "University is required",
        grade: (value) => !value && "Grade is required",
        level: (value) => !value && "Level is required",
        rating: (value) => !value && "Rating is required",
        ratingReason: (value) => value ? value.length > 500 ? "Maximum character length is 300" : null : "You must provide a reason for the rating"
      },
      additionalDegrees: {
        name: (value) => !value && "Course name is required",
        university: (value) => !value && "University is required"
      },
      previousWorkExperience: {
        role: (value) => !value && "Role is required",
        experienceName: (value) => !value && "Experience name is required",
        experienceType: (value) => !value && "Experience type is required",
        ratingReason: (value) => value ? value.length > 500 ? "Maximum character length is 300" : null : "You must provide a reason for the rating",
        rating: (value) => !value && "Rating is required"
      },
      areasOfInterest: (value) => value.length ? value.length > 3 ? "You can only choose up to three areas of interest" : null : "You must select at least one area of interest",
      personalityType: {
        workValue: (value) => !value && "You must provide a preferred career value",
        workStyle: (value) => !value && "You must provide a preferred work style"
      },
      expectedSalary: {
        expectedSalary: (value) => value ? Number.isNaN(value) ? "Expected starting salary must be a number" : value < 0 ? "Expected starting salary cannot be negative" : null : "Expected starting salary is required"
      }
    }
  });
  return { form, checkFormIsValid: () => (form.validate(), !fieldsToCheck?.some((field) => !form.isValid(field))) };
};

// app/shared/components/shell/Shell.tsx
import { useMemo as useMemo3 } from "react";
import { AppShell, ScrollArea, rem } from "@mantine/core";
import classNames4 from "classnames";

// app/shared/components/pageHeader/PageHeader.tsx
import { Image } from "@mantine/core";

// app/assets/career26.png
var career26_default = "/build/_assets/career26-JWGB2ETL.png";

// app/assets/logo.png
var logo_default = "/build/_assets/logo-PZNEHA2E.png";

// app/shared/components/account/LoginModal.tsx
import { Authenticator as Authenticator2, useAuthenticator as useAuthenticator2 } from "@aws-amplify/ui-react";
import { useEffect as useEffect3 } from "react";
import { Modal as Modal2, Text as Text6 } from "@mantine/core";
import classNames from "classnames";

// app/shared/components/account/SignUpBenefits.tsx
import { List, Text as Text5 } from "@mantine/core";
import {
  IconChecklist,
  IconWorldSearch,
  IconCertificate,
  IconUsersGroup
} from "@tabler/icons-react";

// app/shared/components/display/TextWithIconBlock.tsx
import { Group as Group3, Text as Text4 } from "@mantine/core";

// app/shared/styles/commonStyles.module.css
var commonStyles_module_default = { hoverItem: "-Y36r", row: "K9Cbf", lightNavyBg: "DYb4P", navyBg: "vp5O5", disabled: "Np3s2", navTile: "_4SCNd", spaceBetweenRow: "-SR4M", mobileNavbar: "_9-kUN" };

// app/shared/components/display/TextWithIconBlock.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var TextWithIconBlock = ({ title, content, Icon }) => {
  let { isMobile } = useMobileStyles();
  return /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsxs6(Group3, { className: commonStyles_module_default.row, children: [
      Icon,
      /* @__PURE__ */ jsx7(Text4, { fw: 800, size: isMobile ? "1rem" : "1.5rem", py: "md", children: title })
    ] }),
    content
  ] });
};

// app/shared/components/account/account.module.css
var account_module_default = { signUpButtonSetRight: "_1Of4n", loginContainer: "Fc7dH", listContent: "_5EsBi", signUpHeaderMobile: "_3zlC8", authenticatorFields: "y4lS2", signUpContainer: "-JfqL", signUpHeader: "npY6v" };

// app/shared/components/account/SignUpBenefits.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var benefits = [
  {
    title: "Industry Insights",
    content: "View industry-specific guidance based on your Career26 Test result",
    Icon: IconWorldSearch
  },
  {
    title: "Interactive Interviews",
    content: "Access our interview question bank and get real-time feedback",
    Icon: IconCertificate
  },
  {
    title: "CV Building Tools",
    content: "Build your CV in 5 minutes with tailored and refined content",
    Icon: IconChecklist
  },
  {
    title: "Global Mentor Network",
    content: "Match with mentors who have similar backgrounds and career goals",
    Icon: IconUsersGroup
  }
], SignUpBenefits = () => /* @__PURE__ */ jsx8(List, { size: "md", center: !0, children: benefits.map(
  ({ title, content, Icon }) => /* @__PURE__ */ jsx8(
    TextWithIconBlock,
    {
      title,
      content: /* @__PURE__ */ jsx8(Text5, { className: account_module_default.listContent, children: content }),
      Icon: /* @__PURE__ */ jsx8(Icon, {})
    },
    `benefit-${title}`
  )
) });

// app/shared/components/account/LoginModal.tsx
import { Fragment as Fragment2, jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var GetAccessTo = () => /* @__PURE__ */ jsx9(Text6, { fw: "bold", size: "2.5rem", py: "sm", children: "Get access to" }), SignUpNow = () => /* @__PURE__ */ jsx9(Text6, { fw: "bold", size: "2.5rem", c: "navy", py: "md", children: "Sign up now" }), SignUpHeader = () => {
  let { isMobile } = useMobileStyles();
  return isMobile ? /* @__PURE__ */ jsx9("div", { className: account_module_default.signUpHeaderMobile, children: /* @__PURE__ */ jsx9(GetAccessTo, {}) }) : /* @__PURE__ */ jsx9("div", { className: classNames(commonStyles_module_default.row, account_module_default.signUpHeader), children: isMobile ? /* @__PURE__ */ jsx9(GetAccessTo, {}) : /* @__PURE__ */ jsxs7(Fragment2, { children: [
    /* @__PURE__ */ jsx9(GetAccessTo, {}),
    /* @__PURE__ */ jsx9(SignUpNow, {})
  ] }) });
}, SignUpForm = () => {
  let { isMobile } = useMobileStyles();
  return isMobile ? /* @__PURE__ */ jsxs7(Fragment2, { children: [
    /* @__PURE__ */ jsx9(SignUpBenefits, {}),
    /* @__PURE__ */ jsx9(SignUpNow, {}),
    /* @__PURE__ */ jsx9("div", { className: account_module_default.authenticatorFields, children: /* @__PURE__ */ jsx9(Authenticator2.SignUp.FormFields, {}) })
  ] }) : /* @__PURE__ */ jsxs7("div", { className: classNames(commonStyles_module_default.row, account_module_default.signUpContainer, account_module_default.signUpHeader), children: [
    /* @__PURE__ */ jsx9(SignUpBenefits, {}),
    /* @__PURE__ */ jsxs7("div", { children: [
      /* @__PURE__ */ jsx9(Authenticator2.SignUp.Header, {}),
      /* @__PURE__ */ jsx9("div", { className: account_module_default.authenticatorFields, children: /* @__PURE__ */ jsx9(Authenticator2.SignUp.FormFields, {}) })
    ] })
  ] });
}, formFields = {
  signUp: {
    name: {
      order: 1,
      label: "Name",
      isRequired: !0,
      placeholder: "Enter your Name"
    },
    email: {
      order: 3,
      isRequired: !0
    },
    password: {
      order: 4,
      isRequired: !0
    },
    confirm_password: {
      order: 5,
      isRequired: !0
    }
  }
}, components = {
  SignUp: {
    FormFields: SignUpForm,
    Header: SignUpHeader
  }
}, LoginModal = () => {
  let { isMobile } = useMobileStyles(), { route } = useAuthenticator2((context) => [context.route]), dispatch = useAppDispatch(), { open, initialState, associateProfileId } = useAppSelector(selectLoginModal), { authenticated } = useAuthUser(), { associateProfile } = useAssociate(), onClose = () => {
    dispatch(setLoginModal({ open: !1 }));
  };
  return useEffect3(() => {
    associateProfileId && authenticated && associateProfile(associateProfileId, onClose);
  }, [authenticated, associateProfileId]), /* @__PURE__ */ jsx9(
    Modal2,
    {
      onClose,
      opened: open,
      withCloseButton: !1,
      centered: !0,
      radius: 10,
      size: route === "signUp" ? "100%" : void 0,
      className: classNames(account_module_default.loginContainer, {
        [account_module_default.signUpButtonSetRight]: !isMobile
      }),
      children: /* @__PURE__ */ jsx9(
        Authenticator2,
        {
          initialState,
          formFields,
          loginMechanisms: ["email"],
          components,
          signUpAttributes: ["email", "name", "gender"]
        }
      )
    }
  );
};

// app/shared/components/burgerMenu/BurgerMenu.tsx
import { Menu, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var BurgerMenu = ({ menu, testId }) => {
  let [opened, { toggle }] = useDisclosure();
  return /* @__PURE__ */ jsxs8(Menu, { width: 300, "data-testid": testId, opened, onChange: toggle, children: [
    /* @__PURE__ */ jsx10(Menu.Target, { children: /* @__PURE__ */ jsx10(Burger, { opened, onClick: toggle }) }),
    /* @__PURE__ */ jsx10(Menu.Dropdown, { children: menu })
  ] });
};

// app/shared/components/pageHeader/CareerNavigation.tsx
import { IconHeart } from "@tabler/icons-react";
import { ActionIcon, Combobox, InputBase, Text as Text7, useCombobox } from "@mantine/core";

// app/shared/hooks/useCareerSelection.ts
import { useEffect as useEffect4, useState as useState2 } from "react";
var getSelectedCareers = (careerPaths) => Object.entries(careerPaths || {}).reduce(
  (agg, [careerId, { selected }]) => selected ? { ...agg, [careerId]: !0 } : agg,
  {}
), useCareerSelection = () => {
  let [selectCareer] = useSelectCareerMutation(), [loadingCareers, setLoadingCareers] = useState2({}), {
    storeTestValues,
    careerTestStorage: { careerPaths }
  } = useCareerTestStorage(), [selectedCareers, setSelectedCareers] = useState2(getSelectedCareers(careerPaths)), handleSelection = async ({
    careerIdentifier,
    profileIdentifier,
    selected
  }) => {
    let { error } = await selectCareer({
      careerIdentifier,
      profileIdentifier,
      selected
    });
    if (error) {
      console.error(`select endpoint did not return data, response: ${error}`);
      return;
    }
    setSelectedCareers((prevSelectedCareers) => ({
      ...prevSelectedCareers,
      [careerIdentifier]: selected
    }));
  }, toggleSelectedCareer = async ({
    careerIdentifier,
    profileIdentifier,
    selected
  }) => {
    !careerPaths || !profileIdentifier || (setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: !0
    })), await handleSelection({ careerIdentifier, profileIdentifier, selected }), setLoadingCareers((prevLoadingCareers) => ({
      ...prevLoadingCareers,
      [careerIdentifier]: !1
    })));
  };
  return useEffect4(() => {
    if (!careerPaths)
      return;
    let newCareerPaths = Object.entries(careerPaths).reduce(
      (agg, [careerId, careerPath]) => ({
        ...agg,
        [careerId]: { ...careerPath, selected: !!selectedCareers[careerId] }
      }),
      {}
    );
    storeTestValues({ key: "careerPaths", value: newCareerPaths });
  }, [selectedCareers]), { toggleSelectedCareer, selectedCareers, loadingCareers };
};

// app/shared/components/pageHeader/pageHeader.module.css
var pageHeader_module_default = { logo: "kowfJ", logoMobile: "Fo40N", container: "kYxdZ", chevron: "_3kljR", avatars: "GYNuo", navCenter: "CGv0y", headerContainer: "QacAH" };

// app/shared/components/pageHeader/CareerNavigation.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
var CareerNavigation = () => {
  let { isMobile } = useMobileStyles(), combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  }), { toggleCareerId, showNavigation } = usePageNavigation(), selectedCareerPath = useAppSelector(selectSelectedCareerPath), profileIdentifier = useAppSelector(selectProfileId), {
    careerTestStorage: { careerPaths }
  } = useCareerTestStorage(), { loadingCareers, selectedCareers, toggleSelectedCareer } = useCareerSelection();
  if (!careerPaths || !showNavigation || !selectedCareerPath)
    return null;
  let onSelect = (careerIdentifier) => {
    toggleCareerId(careerIdentifier), combobox.closeDropdown();
  }, options = Object.entries(careerPaths).map(([careerIdentifier, { title }]) => {
    let selected = selectedCareers[careerIdentifier];
    return /* @__PURE__ */ jsxs9(
      Combobox.Option,
      {
        value: careerIdentifier,
        className: commonStyles_module_default.spaceBetweenRow,
        w: "100%",
        p: "sm",
        id: "dave",
        onClick: (e) => {
          e.target.textContent && onSelect(careerIdentifier);
        },
        children: [
          /* @__PURE__ */ jsx11(Text7, { children: title }),
          /* @__PURE__ */ jsx11(
            ActionIcon,
            {
              "aria-label": `favourite-icon-${careerIdentifier}`,
              loading: loadingCareers[careerIdentifier],
              variant: "transparent",
              id: "select",
              onClick: () => toggleSelectedCareer({
                selected: !selected,
                careerIdentifier,
                profileIdentifier
              }),
              children: /* @__PURE__ */ jsx11(
                IconHeart,
                {
                  size: 30,
                  fill: selected ? "red" : "transparent",
                  color: selected ? "red" : "navy"
                }
              )
            }
          )
        ]
      },
      `household-${careerIdentifier}`
    );
  });
  return /* @__PURE__ */ jsxs9(Combobox, { store: combobox, children: [
    /* @__PURE__ */ jsx11(Combobox.Target, { children: /* @__PURE__ */ jsx11(
      InputBase,
      {
        w: isMobile ? "100%" : "50%",
        component: "button",
        px: "xs",
        pointer: !0,
        rightSection: /* @__PURE__ */ jsx11(
          ActionIcon,
          {
            onClick: () => combobox.toggleDropdown(),
            color: "none",
            className: pageHeader_module_default.chevron,
            children: /* @__PURE__ */ jsx11(Combobox.Chevron, { color: "none" })
          }
        ),
        onClick: () => combobox.toggleDropdown(),
        children: /* @__PURE__ */ jsx11(Text7, { children: selectedCareerPath?.title })
      }
    ) }),
    /* @__PURE__ */ jsx11(Combobox.Dropdown, { children: /* @__PURE__ */ jsx11(Combobox.Options, { children: options }) })
  ] });
};

// app/shared/components/pageHeader/IconButtons.tsx
import { Button as Button2, Avatar as Avatar2, Menu as Menu2 } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classNames3 from "classnames";

// app/shared/components/pageHeader/NavigationCenter.tsx
import { useNavigate as useNavigate2 } from "@remix-run/react";
import { useEffect as useEffect5 } from "react";
import { useDisclosure as useDisclosure2 } from "@mantine/hooks";
import { Modal as Modal3, Grid as Grid2, Paper, Container as Container2, Avatar, Text as Text8 } from "@mantine/core";
import { IconLayoutDashboard } from "@tabler/icons-react";
import classNames2 from "classnames";

// app/shared/constants/featureConstants.ts
import {
  IconCertificate as IconCertificate2,
  IconChecklist as IconChecklist2,
  IconReportSearch,
  IconUsersGroup as IconUsersGroup2,
  IconWorldSearch as IconWorldSearch2
} from "@tabler/icons-react";
var featureTiles = [
  {
    title: "Career Test",
    description: "Take our career test and view your career path results",
    Icon: IconReportSearch,
    link: urls.careersTest
  },
  {
    title: "Industry Insights",
    description: "Explore industry insights and discover the potential of your careers",
    Icon: IconWorldSearch2,
    link: urls.overview
  },
  {
    title: "Interview Questions",
    description: "Practice interview questions and get instant feedback with our interactive assessor",
    Icon: IconCertificate2,
    link: urls.questions
  },
  {
    title: "Mentor Network",
    description: "Connect with professionals in your industry",
    Icon: IconUsersGroup2,
    link: urls.mentors,
    disabled: !0
  },
  {
    title: "CV Builder",
    description: "Create and refine your CV for your new industry",
    Icon: IconChecklist2,
    link: urls.mentors,
    disabled: !0
  }
];

// app/shared/components/pageHeader/NavigationCenter.tsx
import { Fragment as Fragment3, jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var NavigationCenter = () => {
  let [opened, { open, close }] = useDisclosure2(!1), navigate = useNavigate2(), { isMobile } = useMobileStyles(), { currentPathname } = usePageNavigation();
  return useEffect5(() => {
    close();
  }, [currentPathname]), /* @__PURE__ */ jsxs10(Fragment3, { children: [
    /* @__PURE__ */ jsx12(
      Avatar,
      {
        radius: "xl",
        onClick: open,
        className: classNames2(commonStyles_module_default.hoverItem, commonStyles_module_default.navyBg),
        color: "white",
        "aria-label": "navigation-center",
        children: /* @__PURE__ */ jsx12(IconLayoutDashboard, {})
      }
    ),
    /* @__PURE__ */ jsx12(
      Modal3,
      {
        opened,
        onClose: close,
        centered: !0,
        withCloseButton: !1,
        size: "md",
        overlayProps: { blur: 3 },
        radius: "lg",
        children: /* @__PURE__ */ jsx12(Container2, { children: /* @__PURE__ */ jsx12(Grid2, { py: "sm", children: featureTiles.map(
          ({ title, Icon, disabled, link }) => /* @__PURE__ */ jsx12(Grid2.Col, { span: 6, className: pageHeader_module_default.navCenter, children: /* @__PURE__ */ jsx12(
            Paper,
            {
              onClick: () => !disabled && navigate(link),
              withBorder: !0,
              p: "md",
              h: 150,
              w: "100%",
              radius: "xm",
              display: "flex",
              className: classNames2(
                commonStyles_module_default.lightNavyBg,
                commonStyles_module_default.hoverItem,
                commonStyles_module_default.navTile,
                {
                  [commonStyles_module_default.disabled]: disabled
                }
              ),
              children: /* @__PURE__ */ jsxs10("div", { children: [
                /* @__PURE__ */ jsx12(Icon, { size: isMobile ? 70 : 100 }),
                /* @__PURE__ */ jsx12(Text8, { size: "sm", children: title })
              ] })
            }
          ) }, title)
        ) }) })
      }
    )
  ] });
};

// app/shared/components/pageHeader/IconButtons.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var IconButtons = ({ signOut, authenticated }) => {
  let dispatch = useAppDispatch(), { isMobile } = useMobileStyles(), { goToSettings } = usePageNavigation(), clickLogin = (initialState) => {
    dispatch(setLoginModal({ open: !0, initialState }));
  }, buttonSize = isMobile ? "xs" : void 0;
  return authenticated ? /* @__PURE__ */ jsxs11("div", { className: pageHeader_module_default.avatars, children: [
    /* @__PURE__ */ jsx13(NavigationCenter, {}),
    /* @__PURE__ */ jsxs11(Menu2, { width: 200, "data-testid": "user-menu", children: [
      /* @__PURE__ */ jsx13(Menu2.Target, { children: /* @__PURE__ */ jsx13(
        Avatar2,
        {
          radius: "xl",
          className: classNames3(commonStyles_module_default.hoverItem, commonStyles_module_default.navyBg),
          color: "white"
        }
      ) }),
      /* @__PURE__ */ jsxs11(Menu2.Dropdown, { children: [
        /* @__PURE__ */ jsx13(Menu2.Label, { children: "Session" }),
        /* @__PURE__ */ jsx13(Menu2.Item, { onClick: signOut, leftSection: /* @__PURE__ */ jsx13(IconLogout, {}), children: "Logout" }),
        /* @__PURE__ */ jsx13(Menu2.Item, { onClick: goToSettings, leftSection: /* @__PURE__ */ jsx13(IconSettings, {}), children: "Account Settings" })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs11("div", { className: pageHeader_module_default.avatars, children: [
    /* @__PURE__ */ jsx13(Button2, { size: buttonSize, variant: "outline", onClick: () => clickLogin("signIn"), children: "Login" }),
    /* @__PURE__ */ jsx13(Button2, { size: buttonSize, onClick: () => clickLogin("signUp"), children: "Sign Up" })
  ] });
};

// app/shared/components/pageHeader/PageHeader.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var PageHeader = ({
  signOut,
  authenticated,
  menu
}) => {
  let { isMobile } = useMobileStyles(), { goToHomepage } = usePageNavigation();
  return /* @__PURE__ */ jsxs12("div", { className: pageHeader_module_default.headerContainer, children: [
    /* @__PURE__ */ jsx14(LoginModal, {}),
    menu && isMobile && /* @__PURE__ */ jsx14(BurgerMenu, { menu }),
    /* @__PURE__ */ jsxs12("div", { className: pageHeader_module_default.logo, children: [
      /* @__PURE__ */ jsx14(
        Image,
        {
          fit: "contain",
          src: logo_default,
          w: "auto",
          h: 25,
          onClick: goToHomepage,
          "aria-label": "logo-icon"
        }
      ),
      /* @__PURE__ */ jsx14(
        Image,
        {
          fit: "contain",
          src: career26_default,
          w: "auto",
          h: 20,
          onClick: goToHomepage,
          "aria-label": "logo-text"
        }
      )
    ] }),
    !isMobile && /* @__PURE__ */ jsx14(CareerNavigation, {}),
    /* @__PURE__ */ jsx14(IconButtons, { signOut, authenticated })
  ] });
};

// app/shared/components/pageFooter/PageFooter.tsx
import { Anchor, Text as Text9 } from "@mantine/core";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";

// app/shared/components/pageFooter/pageFooter.module.css
var pageFooter_module_default = { right: "a2zyp", anchor: "_0ojPA", container: "HZQxY", copyright: "uFrkT" };

// app/shared/components/pageFooter/PageFooter.tsx
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
var subject = "Career26 - Contact Us", mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`, PageFooter = () => {
  let dispatch = useAppDispatch();
  return /* @__PURE__ */ jsxs13("div", { className: pageFooter_module_default.container, children: [
    /* @__PURE__ */ jsx15(Text9, { w: "50%", c: "navy", className: pageFooter_module_default.copyright, children: "\xA92023 Career26 Ltd" }),
    /* @__PURE__ */ jsxs13("div", { className: pageFooter_module_default.right, children: [
      /* @__PURE__ */ jsx15(
        Anchor,
        {
          className: pageFooter_module_default.anchor,
          underline: "never",
          onClick: () => dispatch(setFeedbackModal({ open: !0 })),
          size: "lg",
          children: "Feedback"
        }
      ),
      /* @__PURE__ */ jsx15(
        Anchor,
        {
          className: pageFooter_module_default.anchor,
          target: "_blank",
          size: "lg",
          onClick: () => window.open(mailtoLink),
          children: /* @__PURE__ */ jsx15(IconMail, {})
        }
      ),
      /* @__PURE__ */ jsx15(Anchor, { className: pageFooter_module_default.anchor, href: urls.linkedIn, target: "_blank", size: "lg", children: /* @__PURE__ */ jsx15(IconBrandLinkedin, {}) })
    ] })
  ] });
};

// app/shared/components/shell/shell.module.css
var shell_module_default = { fullWidthContainer: "whLQ7", careerNav: "bHRCd", footer: "_7wrN0", main: "U9EmI" };

// app/shared/components/shell/Shell.tsx
import { jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
var navWidth = 200, headerHeight = rem(80), footerHeight = rem(50), NavMenu = ({ navbar }) => /* @__PURE__ */ jsx16(ScrollArea, { h: `calc(100vh - ${headerHeight} - ${footerHeight})`, children: navbar }), Shell = ({ children, navbar }) => {
  let dispatch = useAppDispatch(), { isMobile } = useMobileStyles(), { authenticated, signOut } = useAuthUser(), { resetValues } = useCareerTestStorage(), { showNavigation } = usePageNavigation(), paddingTop = useMemo3(() => isMobile ? showNavigation ? `calc(${headerHeight} + ${rem(60)})` : `calc(${headerHeight})` : headerHeight, [isMobile, showNavigation]), onSignOut = () => {
    resetValues(), dispatch(resetSession()), signOut();
  }, { paddingLeft, navbarSettings } = useMemo3(() => isMobile || !navbar ? { paddingLeft: 0, navbarSettings: void 0 } : {
    paddingLeft: navWidth,
    navbarSettings: { width: navWidth, breakpoint: "sm" }
  }, [isMobile, navbar]);
  return /* @__PURE__ */ jsxs14(
    AppShell,
    {
      styles: {
        main: {
          backgroundColor: "var(--mantine-color-gray-0)",
          height: "100%",
          paddingRight: "0",
          paddingLeft,
          paddingTop
        }
      },
      header: { height: headerHeight },
      navbar: navbarSettings,
      footer: { height: footerHeight },
      children: [
        /* @__PURE__ */ jsx16(AppShell.Header, { className: shell_module_default.fullWidthContainer, children: /* @__PURE__ */ jsx16(
          PageHeader,
          {
            authenticated,
            signOut: onSignOut,
            menu: navbar && /* @__PURE__ */ jsx16(NavMenu, { navbar })
          }
        ) }),
        navbar && !isMobile && /* @__PURE__ */ jsx16(AppShell.Navbar, { display: "flex", w: 200, children: /* @__PURE__ */ jsx16(AppShell.Section, { children: /* @__PURE__ */ jsx16(NavMenu, { navbar }) }) }),
        isMobile && showNavigation && /* @__PURE__ */ jsx16("div", { className: shell_module_default.careerNav, style: { top: headerHeight }, children: /* @__PURE__ */ jsx16(CareerNavigation, {}) }),
        /* @__PURE__ */ jsx16(AppShell.Main, { className: shell_module_default.main, children }),
        /* @__PURE__ */ jsx16(AppShell.Footer, { className: classNames4(shell_module_default.fullWidthContainer, shell_module_default.footer), children: /* @__PURE__ */ jsx16(PageFooter, {}) })
      ]
    }
  );
};

// app/shared/components/loadingScreen/LoaderWithText.tsx
import { Loader } from "@mantine/core";

// app/shared/components/loadingScreen/TypeWriter.tsx
import { useEffect as useEffect6, useState as useState3 } from "react";

// app/shared/components/loadingScreen/loadingScreen.module.css
var loadingScreen_module_default = { container: "bX2kA", typeWriter: "WD9uC", loader: "KwjoB", lensContainer: "Aw9L6", logoContainer: "bZRQh", logo: "APYxI", title: "RUrsC", dots: "Xm-L7" };

// app/shared/components/loadingScreen/TypeWriter.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var TypeSomething = ({
  text,
  textDelay,
  repeatDelay,
  deleteDelay,
  onComplete
}) => {
  let [currentText, setCurrentText] = useState3(""), [currentIndex, setCurrentIndex] = useState3(0), [isComplete, setIsComplete] = useState3(!1);
  return useEffect6(() => {
    currentIndex === -1 && onComplete && onComplete();
  }, [currentIndex]), useEffect6(() => {
    if (currentIndex === text.length && !isComplete) {
      let timeout = setTimeout(() => {
        setIsComplete(!0);
      }, deleteDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < text.length && !isComplete) {
      let timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]), setCurrentIndex((prevIndex) => prevIndex + 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex > -1) {
      let timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText.slice(0, -1)), setCurrentIndex((prevIndex) => prevIndex - 1);
      }, textDelay);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === -1) {
      let timeout = setTimeout(() => {
        setIsComplete(!1), setCurrentIndex(0);
      }, repeatDelay);
      return () => clearTimeout(timeout);
    }
    return () => {
    };
  }, [currentIndex, repeatDelay, textDelay, text, isComplete, deleteDelay]), /* @__PURE__ */ jsx17("span", { children: currentText });
}, TypeWriter = ({
  text,
  repeatSequence
}) => {
  let [lineIndex, setLineIndex] = useState3(0), onComplete = () => {
    lineIndex === text.length - 1 && repeatSequence ? setLineIndex(0) : setLineIndex(lineIndex + 1);
  }, selectedText = text[lineIndex];
  return /* @__PURE__ */ jsx17("div", { className: loadingScreen_module_default.container, children: selectedText && /* @__PURE__ */ jsx17("div", { className: loadingScreen_module_default.typeWriter, children: /* @__PURE__ */ jsx17("h1", { children: /* @__PURE__ */ jsx17(
    TypeSomething,
    {
      text: selectedText,
      textDelay: 40,
      repeatDelay: 1e3,
      deleteDelay: 2e3,
      onComplete
    }
  ) }) }) });
};

// app/shared/components/loadingScreen/LoaderWithText.tsx
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var LoaderWithText = ({ text }) => /* @__PURE__ */ jsxs15("div", { className: loadingScreen_module_default.container, children: [
  /* @__PURE__ */ jsx18("div", { className: loadingScreen_module_default.typeWriter, children: /* @__PURE__ */ jsx18(TypeWriter, { repeatSequence: !0, text }) }),
  /* @__PURE__ */ jsx18("div", { className: loadingScreen_module_default.loader, children: /* @__PURE__ */ jsx18(Loader, { type: "dots", size: "xl" }) })
] });

// app/features/careerTest/educationForm/EducationForm.tsx
import { Group as Group6, Button as Button4, Container as Container3 } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

// app/shared/components/forms/RemoveRowButton.tsx
import { Button as Button3, Group as Group4 } from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
var RemoveRowButton = ({ label, onClick }) => /* @__PURE__ */ jsx19(Group4, { py: "sm", children: /* @__PURE__ */ jsxs16(Button3, { leftSection: /* @__PURE__ */ jsx19(IconMinus, {}), color: "red", onClick, children: [
  "Remove ",
  label
] }) });

// app/features/careerTest/educationForm/UniversityForm.tsx
import { Select, TextInput, Textarea as Textarea2 } from "@mantine/core";

// app/shared/components/forms/FormContent.tsx
import { Card, Group as Group5, Text as Text10 } from "@mantine/core";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
var FormContent = ({ title, children }) => /* @__PURE__ */ jsxs17(Card, { radius: "md", p: "md", withBorder: !0, children: [
  title && /* @__PURE__ */ jsx20(Card.Section, { withBorder: !0, inheritPadding: !0, py: "xs", bg: "navy", c: "white", children: /* @__PURE__ */ jsx20(Group5, { justify: "center", children: /* @__PURE__ */ jsx20(Text10, { fw: "bold", size: "lg", children: title }) }) }),
  children
] });

// app/features/careerTest/educationForm/UniversityForm.tsx
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
var UniversityForm = ({ form, baseKey: baseKey2, title }) => {
  let rating = form.getInputProps(`${baseKey2}.rating`).value, ratingReason = form.getInputProps(`${baseKey2}.ratingReason`).value;
  return /* @__PURE__ */ jsxs18(FormContent, { title, children: [
    /* @__PURE__ */ jsxs18("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx21(
        TextInput,
        {
          ...form.getInputProps(`${baseKey2}.university`),
          label: "University Name",
          withAsterisk: !0,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx21(
        TextInput,
        {
          ...form.getInputProps(`${baseKey2}.name`),
          label: "Course Name",
          withAsterisk: !0,
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs18("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx21(
        Select,
        {
          ...form.getInputProps(`${baseKey2}.grade`),
          label: "Achieved/Expected Grade",
          data: degreeOptions,
          withAsterisk: !0,
          placeholder: "Select a grade",
          w: "50%",
          searchable: !0
        }
      ),
      /* @__PURE__ */ jsx21(
        Select,
        {
          ...form.getInputProps(`${baseKey2}.level`),
          label: "Degree",
          data: degreeLevels,
          withAsterisk: !0,
          searchable: !0,
          placeholder: "Select a level",
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsx21(
      Select,
      {
        ...form.getInputProps(`${baseKey2}.rating`),
        label: "Course Rating",
        data: ratingOptions,
        placeholder: "Select a rating",
        py: "xs",
        searchable: !0,
        withAsterisk: !0
      }
    ),
    /* @__PURE__ */ jsx21(
      Textarea2,
      {
        ...form.getInputProps(`${baseKey2}.ratingReason`),
        label: getRatingLabel(rating, ratingReason?.length),
        minRows: 3,
        autosize: !0,
        py: "xs",
        withAsterisk: !0
      }
    )
  ] });
};

// app/features/careerTest/careerTest.module.css
var careerTest_module_default = { workLifeCheckbox: "uu7zG", result: "zzihJ", typeWriter: "ShpDe", loader: "HDNoF", container: "O9Hqh" };

// app/features/careerTest/educationForm/EducationForm.tsx
import { jsx as jsx22, jsxs as jsxs19 } from "react/jsx-runtime";
var EducationForm = ({ form }) => {
  let additionalDegreesCount = form.values.additionalDegrees.length, onClickAddUniversity = () => {
    form.setFieldValue(
      "additionalDegrees",
      [
        ...form.values.additionalDegrees,
        initialUniversityValues
      ]
    );
  }, onClickRemoveUniversity = (key) => {
    form.setFieldValue(
      "additionalDegrees",
      form.values.additionalDegrees.filter((_degree, i) => i !== key)
    );
  };
  return /* @__PURE__ */ jsxs19(Container3, { py: "md", className: careerTest_module_default.container, children: [
    /* @__PURE__ */ jsx22(UniversityForm, { form, baseKey: "latestDegree", title: "Your Education History" }),
    [...Array(additionalDegreesCount).keys()].map((key) => {
      let baseKey2 = `additionalDegrees.${key}`;
      return /* @__PURE__ */ jsxs19("div", { children: [
        /* @__PURE__ */ jsx22(UniversityForm, { form, baseKey: baseKey2 }),
        key + 1 !== additionalDegreesCount && /* @__PURE__ */ jsx22(RemoveRowButton, { onClick: () => onClickRemoveUniversity(key), label: "University" })
      ] }, baseKey2);
    }),
    /* @__PURE__ */ jsxs19(Group6, { py: "md", justify: additionalDegreesCount ? "space-between" : "flex-end", children: [
      additionalDegreesCount && /* @__PURE__ */ jsx22(
        RemoveRowButton,
        {
          label: "University",
          onClick: () => onClickRemoveUniversity(additionalDegreesCount - 1)
        }
      ),
      /* @__PURE__ */ jsx22(Button4, { leftSection: /* @__PURE__ */ jsx22(IconPlus, {}), onClick: onClickAddUniversity, children: "Add Another University" })
    ] })
  ] });
};

// app/features/careerTest/workExperienceForm/WorkExperienceForm.tsx
import { Button as Button5, Container as Container4, Group as Group7 } from "@mantine/core";
import { IconPlus as IconPlus2 } from "@tabler/icons-react";

// app/features/careerTest/workExperienceForm/ExperienceForm.tsx
import { Select as Select2, TextInput as TextInput2, Textarea as Textarea3 } from "@mantine/core";
import { jsx as jsx23, jsxs as jsxs20 } from "react/jsx-runtime";
var getNameLabel = (experienceType) => {
  let label = experienceOptions.find((item) => item.value === experienceType)?.label;
  switch (experienceType) {
    case "VOLUNTEERING" /* Volunteering */:
      return "Organisation";
    case "OTHER" /* Other */:
    case void 0:
      return "";
    default:
      return label;
  }
}, ExperienceForm = ({ form, baseKey: baseKey2, title }) => {
  let rating = form.getInputProps(`${baseKey2}.rating`).value, ratingReason = form.getInputProps(`${baseKey2}.ratingReason`).value, experienceType = form.getInputProps(`${baseKey2}.experienceType`).value, experienceLabel = getNameLabel(experienceType);
  return /* @__PURE__ */ jsxs20(FormContent, { title, children: [
    /* @__PURE__ */ jsxs20("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx23(
        Select2,
        {
          ...form.getInputProps(`${baseKey2}.experienceType`),
          withAsterisk: !0,
          label: "Type",
          placeholder: "Select experience type",
          data: experienceOptions,
          w: "50%",
          searchable: !0
        }
      ),
      /* @__PURE__ */ jsx23(
        TextInput2,
        {
          ...form.getInputProps(`${baseKey2}.experienceName`),
          label: `${experienceLabel} Name`,
          withAsterisk: !0,
          py: "xs",
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsx23(TextInput2, { ...form.getInputProps(`${baseKey2}.role`), label: "Role", withAsterisk: !0 }),
    /* @__PURE__ */ jsx23(
      Select2,
      {
        ...form.getInputProps(`${baseKey2}.rating`),
        withAsterisk: !0,
        label: "What did you think of this role?",
        data: ratingOptions,
        placeholder: "Select a rating",
        py: "xs",
        searchable: !0
      }
    ),
    /* @__PURE__ */ jsx23(
      Textarea3,
      {
        ...form.getInputProps(`${baseKey2}.ratingReason`),
        label: getRatingLabel(rating, ratingReason.length),
        minRows: 3,
        autosize: !0,
        withAsterisk: !0,
        py: "xs"
      }
    )
  ] });
};

// app/features/careerTest/workExperienceForm/WorkExperienceForm.tsx
import { jsx as jsx24, jsxs as jsxs21 } from "react/jsx-runtime";
var WorkExperienceForm = ({ form }) => {
  let workExperienceCount = form.values.previousWorkExperience.length, onClickAddExperience = () => {
    form.setFieldValue(
      "previousWorkExperience",
      [
        ...form.values.previousWorkExperience,
        initialWorkExperienceValues
      ]
    );
  }, onClickRemoveExperience = (key) => {
    form.setFieldValue(
      "previousWorkExperience",
      form.values.previousWorkExperience.filter((_degree, i) => i !== key)
    );
  };
  return /* @__PURE__ */ jsxs21(Container4, { py: "md", className: careerTest_module_default.container, children: [
    [...Array(workExperienceCount).keys()].map((key) => {
      let baseKey2 = `previousWorkExperience.${key}`;
      return /* @__PURE__ */ jsxs21("div", { children: [
        /* @__PURE__ */ jsx24(
          ExperienceForm,
          {
            title: key === 0 ? "Your Previous Experience" : void 0,
            form,
            baseKey: baseKey2
          },
          baseKey2
        ),
        key > 0 && key + 1 !== workExperienceCount && /* @__PURE__ */ jsx24(RemoveRowButton, { onClick: () => onClickRemoveExperience(key), label: "Experience" })
      ] }, baseKey2);
    }),
    /* @__PURE__ */ jsxs21(Group7, { py: "md", justify: workExperienceCount > 1 ? "space-between" : "flex-end", children: [
      workExperienceCount > 1 && /* @__PURE__ */ jsx24(
        RemoveRowButton,
        {
          label: "Experience",
          onClick: () => onClickRemoveExperience(workExperienceCount - 1)
        }
      ),
      /* @__PURE__ */ jsx24(Button5, { leftSection: /* @__PURE__ */ jsx24(IconPlus2, {}), onClick: onClickAddExperience, children: "Add Another Experience" })
    ] })
  ] });
};

// app/features/careerTest/preferencesForm/PreferencesForm.tsx
import { Container as Container5 } from "@mantine/core";

// app/features/careerTest/preferencesForm/AreasofInterestForm.tsx
import { useMemo as useMemo4, useState as useState4 } from "react";
import { TagsInput } from "@mantine/core";
import { jsx as jsx25 } from "react/jsx-runtime";
var AreasOfInterestForm = ({ form }) => {
  let [input, setInput] = useState4(""), addLabel = `Add "${input}"`, options = useMemo4(
    () => input ? [...exampleAreasOfInterest, addLabel] : exampleAreasOfInterest,
    [input]
  ), onChange = (selection) => {
    let newValues = selection.reduce(
      (agg, item) => item === addLabel ? [...agg, input] : [...agg, item],
      []
    );
    form.setFieldValue("areasOfInterest", newValues), setInput("");
  };
  return /* @__PURE__ */ jsx25("div", { children: /* @__PURE__ */ jsx25(
    TagsInput,
    {
      py: "xs",
      ...form.getInputProps("areasOfInterest"),
      data: options,
      onChange,
      clearable: !0,
      onInput: ({ target: { value } }) => setInput(value),
      withAsterisk: !0,
      placeholder: "Enter interest",
      label: "Press Enter to add an interest",
      description: "Add up to 3 interests"
    }
  ) });
};

// app/features/careerTest/preferencesForm/WorkStyleForm.tsx
import { NumberInput, Select as Select3 } from "@mantine/core";
import { jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
var WorkStyleForm = ({ form }) => {
  let Icon = exampleCities.find((item) => item.value === form.values.expectedSalary.city)?.Icon, onSelectCity = (value) => {
    let city = exampleCities.find((item) => item.value === value);
    city && (form.setFieldValue("expectedSalary.city", city.value), form.setFieldValue("expectedSalary.baseCurrency", city.baseCurrency));
  };
  return /* @__PURE__ */ jsxs22("div", { children: [
    /* @__PURE__ */ jsxs22("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("personalityType.workStyle"),
          label: "What is your preferred working style?",
          withAsterisk: !0,
          data: workStyleOptions,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("personalityType.workValue"),
          label: "What do you value the most in a career?",
          withAsterisk: !0,
          data: workLifeOptions,
          w: "50%"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs22("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx26(
        Select3,
        {
          ...form.getInputProps("expectedSalary.city"),
          label: "City",
          data: exampleCities,
          withAsterisk: !0,
          onChange: onSelectCity,
          w: "50%"
        }
      ),
      /* @__PURE__ */ jsx26(
        NumberInput,
        {
          ...form.getInputProps("expectedSalary.expectedSalary"),
          label: "What is your expected starting salary?",
          withAsterisk: !0,
          thousandSeparator: ",",
          leftSection: Icon && /* @__PURE__ */ jsx26(Icon, { color: "gray", size: 20 }),
          w: "50%"
        }
      )
    ] })
  ] });
};

// app/features/careerTest/preferencesForm/PreferencesForm.tsx
import { jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
var PreferencesForm = ({ form }) => /* @__PURE__ */ jsx27(Container5, { py: "md", children: /* @__PURE__ */ jsxs23(FormContent, { title: "Preferences", children: [
  /* @__PURE__ */ jsx27(AreasOfInterestForm, { form }),
  /* @__PURE__ */ jsx27(WorkStyleForm, { form })
] }) });

// app/features/careerTest/careerPathsForm/CareerPathsForm.tsx
import { Grid as Grid3, Container as Container6 } from "@mantine/core";
import { useEffect as useEffect7 } from "react";

// app/features/careerTest/careerPathsForm/ResultCard.tsx
import { ActionIcon as ActionIcon2, Badge, Card as Card2, Group as Group8, Text as Text11 } from "@mantine/core";
import { IconHeart as IconHeart2 } from "@tabler/icons-react";
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
var ResultCard = ({
  title,
  color,
  industry,
  selected,
  loading,
  salary,
  role,
  onClick
}) => /* @__PURE__ */ jsxs24(Card2, { padding: "lg", withBorder: !0, h: "100%", children: [
  /* @__PURE__ */ jsx28(Card2.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs24(Group8, { justify: "space-between", children: [
    /* @__PURE__ */ jsx28(Text11, { fw: "bold", children: title }),
    /* @__PURE__ */ jsx28(ActionIcon2, { loading, onClick, variant: "transparent", children: /* @__PURE__ */ jsx28(
      IconHeart2,
      {
        size: 50,
        fill: selected ? "red" : "transparent",
        color: selected ? "red" : "navy"
      }
    ) })
  ] }) }),
  /* @__PURE__ */ jsxs24(Group8, { justify: "space-between", py: "sm", children: [
    /* @__PURE__ */ jsx28(Text11, { fw: "bold", children: salary }),
    /* @__PURE__ */ jsx28(Badge, { color, children: industry })
  ] }),
  role
] });

// app/features/careerTest/careerPathsForm/CareerPathsForm.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
var CareerPathsForm = ({ careerPaths, profileId }) => {
  let industryColors = useAppSelector(selectIndustryColors), { toggleSelectedCareer, selectedCareers, loadingCareers } = useCareerSelection(), dispatch = useAppDispatch();
  return useEffect7(() => {
    let industries = Object.values(careerPaths || {}).map((item) => item.industry);
    dispatch(addIndustryColors(industries));
  }, [careerPaths]), /* @__PURE__ */ jsx29(Container6, { py: "md", children: /* @__PURE__ */ jsx29(FormContent, { title: "Select Your Favourite Career Paths", children: /* @__PURE__ */ jsx29(Grid3, { py: "lg", grow: !0, children: Object.entries(careerPaths || {}).map(
    ([careerIdentifier, { title, startingSalary, industry, role }]) => {
      let selected = selectedCareers[careerIdentifier];
      return /* @__PURE__ */ jsx29(
        Grid3.Col,
        {
          span: { md: 6 },
          className: careerTest_module_default.result,
          children: /* @__PURE__ */ jsx29(
            ResultCard,
            {
              salary: startingSalary,
              loading: loadingCareers[careerIdentifier],
              role,
              selected,
              industry,
              title,
              color: industryColors[industry],
              onClick: () => toggleSelectedCareer({
                careerIdentifier,
                profileIdentifier: profileId,
                selected: !selected
              })
            }
          )
        },
        `career-path-${careerIdentifier}`
      );
    }
  ) }) }) });
};

// app/features/careerTest/diversityForm/DiversityForm.tsx
import { Accordion, Container as Container7, Select as Select4 } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { jsx as jsx30, jsxs as jsxs25 } from "react/jsx-runtime";
var yesNoPreferOptions = Object.entries(YesNoPreferNotToSay).map(([label, value]) => ({
  label,
  value
})), DiversityForm = ({ form }) => /* @__PURE__ */ jsx30(Container7, { py: "md", children: /* @__PURE__ */ jsxs25(FormContent, { title: "Diversity and Inclusion (Optional)", children: [
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(Accordion, { w: "100%", children: /* @__PURE__ */ jsxs25(Accordion.Item, { value: "why", children: [
    /* @__PURE__ */ jsx30(Accordion.Control, { icon: /* @__PURE__ */ jsx30(IconInfoCircle, {}), children: "Why do we ask for this information?" }),
    /* @__PURE__ */ jsxs25(Accordion.Panel, { children: [
      "We use the answer to:",
      /* @__PURE__ */ jsxs25("ul", { children: [
        /* @__PURE__ */ jsx30("li", { children: "Provide you with career options you may not have considered" }),
        /* @__PURE__ */ jsx30("li", { children: "Match you with mentors from shared backgrounds" })
      ] })
    ] })
  ] }) }) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.firstGeneration"),
      w: "100%",
      label: "Are you the first generation in your family to attend univeristy?",
      data: yesNoPreferOptions,
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.schoolType"),
      w: "100%",
      label: "What was the main type of school you attended for your secondary education?",
      data: Object.entries(SchoolType).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.ethnicity"),
      w: "100%",
      label: "What is your ethnicity?",
      data: Object.entries(Ethnicity).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) }),
  /* @__PURE__ */ jsx30("div", { className: commonStyles_module_default.row, children: /* @__PURE__ */ jsx30(
    Select4,
    {
      ...form.getInputProps("diversity.gender"),
      w: "100%",
      label: "What is your current gender identity?",
      data: Object.entries(Gender).map(([label, value]) => ({ label, value })),
      searchable: !0
    }
  ) })
] }) });

// app/routes/career-test.tsx
import { Fragment as Fragment4, jsx as jsx31, jsxs as jsxs26 } from "react/jsx-runtime";
var stepperLabels = ["Education", "Experience", "Preferences", "Diversity", "Career Paths"], Index = () => {
  let dispatch = useAppDispatch(), { authenticated } = useAuthUser(), [createProfile, { data, isLoading, error }] = useCreateProfileMutation(), { storeTestValues, careerTestStorage } = useCareerTestStorage(), [activeStep, setActiveStep] = useState5(careerTestStorage.step), { form, checkFormIsValid } = useCareerTestForm({ activeStep }), { isMobile } = useMobileStyles(), { associateProfile, loading } = useAssociate();
  useEffect8(() => {
    let newStep = activeStep >= 5 /* COMPLETE */ ? 5 /* COMPLETE */ : activeStep;
    storeTestValues({ key: "step", value: newStep });
  }, [activeStep]), useEffect8(() => {
    if (error) {
      console.error(`create profile error - ${JSON.stringify(error)}`), notifications3.show({
        title: "Profile Generation Error",
        message: "Could not create profile, please try again later",
        color: "red"
      }), setActiveStep(3 /* DIVERSITY */);
      return;
    }
    data?.careerPaths && (storeTestValues({ key: "profileId", value: data.identifier }), storeTestValues({ key: "careerPaths", value: data.careerPaths }), setActiveStep(activeStep + 1));
  }, [data, error]);
  let nextLabel = useMemo5(
    () => !authenticated || activeStep !== 5 /* COMPLETE */ ? "Next" : "Save",
    [authenticated, activeStep]
  ), backLabel = useMemo5(
    () => activeStep === 5 /* COMPLETE */ ? "Retake Test" : "Back",
    [activeStep]
  ), clickNext = () => {
    if (nextLabel === "Save") {
      associateProfile(careerTestStorage.profileId);
      return;
    }
    let formIsvalid = checkFormIsValid();
    storeTestValues({ key: "formValues", value: form.values }), formIsvalid && (form.clearErrors(), activeStep === 3 /* DIVERSITY */ && (storeTestValues({ key: "careerPaths", value: void 0 }), createProfile(form.values)), activeStep === 5 /* COMPLETE */ ? dispatch(
      setLoginModal({
        open: !authenticated,
        associateProfileId: careerTestStorage?.profileId,
        initialState: "signUp"
      })
    ) : setActiveStep(activeStep + 1));
  }, clickBack = () => {
    activeStep === 5 /* COMPLETE */ ? setActiveStep(activeStep - 2) : setActiveStep(activeStep - 1);
  };
  return /* @__PURE__ */ jsx31(Shell, { children: /* @__PURE__ */ jsxs26(Fragment4, { children: [
    /* @__PURE__ */ jsx31(Container8, { children: /* @__PURE__ */ jsx31(Stepper, { active: activeStep, onStepClick: setActiveStep, py: "md", children: stepperLabels.map((label, index) => /* @__PURE__ */ jsx31(
      Stepper.Step,
      {
        label: !isMobile && label,
        loading: index === 4 /* CAREER_PATHS */ && isLoading,
        disabled: index > activeStep
      },
      `stepper-${label}`
    )) }) }),
    /* @__PURE__ */ jsx31(Container8, { py: "md", children: isLoading ? /* @__PURE__ */ jsx31(LoaderWithText, { text: careerLoadingText }) : /* @__PURE__ */ jsxs26(Fragment4, { children: [
      activeStep === 0 /* EDUCATION */ && /* @__PURE__ */ jsx31(EducationForm, { form }),
      activeStep === 1 /* WORK_EXPERIENCE */ && /* @__PURE__ */ jsx31(WorkExperienceForm, { form }),
      activeStep === 2 /* PREFERENCES */ && /* @__PURE__ */ jsx31(PreferencesForm, { form }),
      activeStep === 3 /* DIVERSITY */ && /* @__PURE__ */ jsx31(DiversityForm, { form }),
      (activeStep === 4 /* CAREER_PATHS */ || activeStep === 5 /* COMPLETE */) && /* @__PURE__ */ jsx31(
        CareerPathsForm,
        {
          careerPaths: careerTestStorage.careerPaths,
          profileId: careerTestStorage.profileId
        }
      ),
      /* @__PURE__ */ jsxs26(Group9, { justify: "center", children: [
        /* @__PURE__ */ jsx31(
          Button6,
          {
            onClick: clickBack,
            disabled: activeStep === 0 /* EDUCATION */ || isLoading,
            variant: "light",
            children: backLabel
          }
        ),
        /* @__PURE__ */ jsx31(
          Button6,
          {
            onClick: clickNext,
            disabled: isLoading || loading,
            loading: isLoading || loading,
            variant: "outline",
            children: nextLabel
          }
        )
      ] })
    ] }) })
  ] }) });
}, career_test_default = Index;

// app/routes/questions.$.tsx
var questions_exports = {};
__export(questions_exports, {
  default: () => questions_default,
  loader: () => loader2
});
import { useLoaderData as useLoaderData2, useNavigate as useNavigate3 } from "@remix-run/react";
import { useEffect as useEffect11 } from "react";
import { Button as Button8, Container as Container9, Group as Group11, Textarea as Textarea4 } from "@mantine/core";
import { hasLength, useForm as useForm3 } from "@mantine/form";

// app/shared/components/loadingScreen/LoadingLens.tsx
import { Image as Image2, Loader as Loader2 } from "@mantine/core";
import { jsx as jsx32, jsxs as jsxs27 } from "react/jsx-runtime";
var LoadingLens = () => /* @__PURE__ */ jsx32("div", { className: loadingScreen_module_default.lensContainer, children: /* @__PURE__ */ jsxs27("div", { className: loadingScreen_module_default.logoContainer, children: [
  /* @__PURE__ */ jsx32(Image2, { src: logo_default, h: 70, w: "auto", fit: "contain", className: loadingScreen_module_default.logo }),
  /* @__PURE__ */ jsx32(Image2, { src: career26_default, h: 20, w: "auto", fit: "contain", className: loadingScreen_module_default.title }),
  /* @__PURE__ */ jsx32(Loader2, { type: "dots", className: loadingScreen_module_default.dots, size: "xl" })
] }) });

// app/features/questions/QuestionSuggestion.tsx
import { useEffect as useEffect9, useState as useState6 } from "react";
import { IconBulb, IconQuestionMark, IconStar } from "@tabler/icons-react";
import { Accordion as Accordion2, Badge as Badge2, List as List2, Loader as Loader3, Paper as Paper2 } from "@mantine/core";
import { Fragment as Fragment5, jsx as jsx33, jsxs as jsxs28 } from "react/jsx-runtime";
var SuggestedFormat = ({ suggestedFormat }) => /* @__PURE__ */ jsx33(List2, { spacing: "md", center: !0, children: Object.entries(suggestedFormat).map(([key, value]) => /* @__PURE__ */ jsx33(List2.Item, { icon: /* @__PURE__ */ jsx33(Badge2, { children: key }), children: value }, `suggestion-${key}`)) }), QuestionSuggestion = () => {
  let [value, setValue] = useState6(null), careerPathId = useAppSelector(selectSelectedCareerPathId), selectedQuestion = useAppSelector(selectSelectedQuestion), fixedCacheKey = `suggestion-${careerPathId}-${selectedQuestion?.question}`, [getSuggestion, { isLoading: suggestionLoading }] = useGetSuggestionMutation({
    fixedCacheKey
  }), suggestion = useAppSelector((state) => selectSuggestion(state, fixedCacheKey));
  return useEffect9(() => {
    !selectedQuestion || !value || !careerPathId || suggestion || getSuggestion({ question: selectedQuestion.question, careerPathId });
  }, [value, selectedQuestion, careerPathId]), useEffect9(() => {
    setValue(null);
  }, [selectedQuestion, careerPathId]), /* @__PURE__ */ jsx33(Paper2, { withBorder: !0, children: /* @__PURE__ */ jsx33(Accordion2, { value, onChange: setValue, children: /* @__PURE__ */ jsxs28(Accordion2.Item, { value: "suggestion", children: [
    /* @__PURE__ */ jsx33(Accordion2.Control, { children: "Show Suggestion" }),
    /* @__PURE__ */ jsx33(Accordion2.Panel, { children: suggestionLoading ? /* @__PURE__ */ jsx33(Loader3, { type: "dots" }) : suggestion && /* @__PURE__ */ jsxs28(Fragment5, { children: [
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Suggested Format",
          content: /* @__PURE__ */ jsx33(SuggestedFormat, { suggestedFormat: suggestion?.suggestedFormat }),
          Icon: /* @__PURE__ */ jsx33(IconStar, { fill: "yellow" })
        }
      ),
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Sample Answer",
          content: suggestion?.sampleAnswer,
          Icon: /* @__PURE__ */ jsx33(IconBulb, { fill: "yellow" })
        }
      ),
      /* @__PURE__ */ jsx33(
        TextWithIconBlock,
        {
          title: "Reasoning",
          content: suggestion?.whySuitable,
          Icon: /* @__PURE__ */ jsx33(IconQuestionMark, {})
        }
      )
    ] }) })
  ] }) }) });
};

// app/features/questions/QuestionNavBar.tsx
import { NavLink } from "@mantine/core";
import classNames5 from "classnames";
import { jsx as jsx34 } from "react/jsx-runtime";
var QuestionNavBar = ({ selectedQuestionId, questions }) => {
  let { toggleQuestionId } = usePageNavigation(), { isMobile } = useMobileStyles();
  return questions?.map(
    ({ question }, index) => /* @__PURE__ */ jsx34(
      NavLink,
      {
        className: classNames5({ [commonStyles_module_default.mobileNavbar]: isMobile }),
        active: selectedQuestionId === index,
        onClick: () => toggleQuestionId(index),
        label: `${index + 1}. ${question}`
      },
      `question-${index}`
    )
  );
};

// app/features/questions/QuestionRating.tsx
import { Accordion as Accordion3, Button as Button7, Paper as Paper3 } from "@mantine/core";
import { useState as useState7 } from "react";
import { IconChecklist as IconChecklist3, IconSpeakerphone, IconWriting } from "@tabler/icons-react";
import { Fragment as Fragment6, jsx as jsx35, jsxs as jsxs29 } from "react/jsx-runtime";
var QuestionRating = ({
  onClickReset,
  onClickNext,
  nextDisabled,
  rating
}) => {
  let [value, setValue] = useState7("rating");
  return rating ? /* @__PURE__ */ jsxs29(Fragment6, { children: [
    /* @__PURE__ */ jsx35(Paper3, { withBorder: !0, children: /* @__PURE__ */ jsx35(Accordion3, { value, onChange: setValue, children: /* @__PURE__ */ jsxs29(Accordion3.Item, { value: "rating", children: [
      /* @__PURE__ */ jsx35(Accordion3.Control, { children: "Answer Rating" }),
      /* @__PURE__ */ jsx35(Accordion3.Panel, { children: /* @__PURE__ */ jsxs29(Fragment6, { children: [
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconSpeakerphone, { color: "orange" }),
            title: "General Feedback",
            content: rating.generalFeedback
          }
        ),
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconChecklist3, { color: "green" }),
            title: "Improvements",
            content: rating.suggestedImprovements
          }
        ),
        /* @__PURE__ */ jsx35(
          TextWithIconBlock,
          {
            Icon: /* @__PURE__ */ jsx35(IconWriting, {}),
            title: "Example Answer",
            content: rating.exampleAnswer
          }
        )
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs29("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx35(Button7, { variant: "light", onClick: onClickReset, children: "Retry" }),
      /* @__PURE__ */ jsx35(Button7, { variant: "outline", disabled: nextDisabled, onClick: onClickNext, children: "Next" })
    ] })
  ] }) : null;
};

// app/features/questions/QuestionCard.tsx
import { Badge as Badge3, Card as Card3, Group as Group10, Text as Text12 } from "@mantine/core";

// app/features/questions/questions.module.css
var questions_module_default = { container: "BjEoI", questionCard: "znkY4" };

// app/features/questions/QuestionCard.tsx
import { jsx as jsx36, jsxs as jsxs30 } from "react/jsx-runtime";
var QuestionCard = ({ title, category, question, color }) => /* @__PURE__ */ jsxs30(Card3, { padding: "lg", radius: "md", withBorder: !0, className: questions_module_default.questionCard, children: [
  /* @__PURE__ */ jsx36(Card3.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs30(Group10, { justify: "space-between", children: [
    /* @__PURE__ */ jsx36(Text12, { fw: "bold", children: title }),
    /* @__PURE__ */ jsx36(Badge3, { color, children: category })
  ] }) }),
  /* @__PURE__ */ jsx36(Text12, { py: "lg", children: question })
] });

// app/shared/hooks/usePageSetup.tsx
import { useEffect as useEffect10 } from "react";
var usePageSetup = () => {
  let dispatch = useAppDispatch(), { authenticated, loading, unauthenticated } = useAuthUser(), careerPaths = useAppSelector(selectCareerPaths), profileId = useAppSelector(selectProfileId), profile = useAppSelector(selectProfileState), [getProfile, { isFetching }] = useLazyGetProfileQuery(), { setupFormValues } = useCareerTestStorage(), { open: loginOpen } = useAppSelector(selectLoginModal);
  return useEffect10(() => {
    if (!careerPaths || !profile)
      return;
    let industries = Object.values(careerPaths).map(({ industry }) => industry);
    dispatch(addIndustryColors(industries)), setupFormValues(profile);
  }, [careerPaths, profile]), useEffect10(() => {
    authenticated && !profileId && !loginOpen && getProfile();
  }, [authenticated, profileId, loginOpen]), {
    loading: loading || isFetching,
    authenticated,
    unauthenticated
  };
};

// app/routes/questions.$.tsx
import { jsx as jsx37, jsxs as jsxs31 } from "react/jsx-runtime";
var loader2 = async ({ params }) => {
  let id = params["*"], [careerId, questionId] = id?.split("/") || [];
  return { careerId, questionId };
}, Index2 = () => {
  let navigate = useNavigate3(), { careerId: _cId, questionId: _qId } = useLoaderData2(), dispatch = useAppDispatch(), { loading, unauthenticated } = usePageSetup(), { toggleQuestionId, toggleCareerId } = usePageNavigation(), careerPathId = useAppSelector(selectSelectedCareerPathId), selectedQuestion = useAppSelector(selectSelectedQuestion), selectedQuestionId = useAppSelector(selectSelectedQuestionId), { data: questions, isFetching } = useGetQuestionsQuery(), [rateAnswer, { data: rating, isLoading: ratingLoading, reset: resetRating }] = useRateAnswerMutation(), questionColors = useAppSelector(selectQuestionColors), onClickReset = () => {
    form.reset(), resetRating();
  }, form = useForm3({
    initialValues: { answer: "" },
    validate: {
      answer: hasLength({ min: 1, max: 1e3 }, "Answer must be 10-1000 characters long")
    }
  });
  return useEffect11(() => {
    if (!questions)
      return;
    let categoies = questions.map(({ category }) => category);
    dispatch(addQuestionColors(categoies));
  }, [questions]), loading || isFetching ? /* @__PURE__ */ jsx37(LoadingLens, {}) : unauthenticated ? (navigate(urls.landingPage), /* @__PURE__ */ jsx37(LoadingLens, {})) : selectedQuestion ? /* @__PURE__ */ jsx37(
    Shell,
    {
      navbar: /* @__PURE__ */ jsx37(QuestionNavBar, { selectedQuestionId, questions }),
      children: /* @__PURE__ */ jsxs31(Container9, { py: "md", className: questions_module_default.container, children: [
        /* @__PURE__ */ jsx37(
          QuestionCard,
          {
            title: `Question ${selectedQuestionId + 1}`,
            question: selectedQuestion.question,
            category: selectedQuestion.category,
            color: questionColors[selectedQuestion.category]
          }
        ),
        /* @__PURE__ */ jsx37(QuestionSuggestion, {}),
        /* @__PURE__ */ jsx37(
          Textarea4,
          {
            ...form.getInputProps("answer"),
            label: `Answer (${1e3 - form.values.answer.length} characters remaining)`,
            placeholder: "Enter your response here",
            withAsterisk: !0,
            minRows: 5,
            maxRows: 10,
            autosize: !0
          }
        ),
        /* @__PURE__ */ jsx37(Group11, { justify: "flex-end", children: /* @__PURE__ */ jsx37(
          Button8,
          {
            variant: "outline",
            disabled: !form.isValid() || ratingLoading,
            loading: ratingLoading,
            w: "20%",
            onClick: () => rateAnswer({
              question: selectedQuestion.question,
              answer: form.values.answer,
              careerPathId
            }),
            children: "Submit"
          }
        ) }),
        /* @__PURE__ */ jsx37(
          QuestionRating,
          {
            rating,
            onClickNext: () => toggleQuestionId(selectedQuestionId + 1),
            onClickReset,
            nextDisabled: questions && selectedQuestionId === questions.length - 1
          }
        )
      ] })
    }
  ) : null;
}, questions_default = Index2;

// app/routes/overview.$.tsx
var overview_exports = {};
__export(overview_exports, {
  default: () => overview_default,
  loader: () => loader3
});
import { useLoaderData as useLoaderData3, useNavigate as useNavigate4 } from "@remix-run/react";
import { Card as Card8, Container as Container10, Group as Group15, Text as Text17 } from "@mantine/core";

// app/features/overview/careerProgressionTile/CareerProgressionTile.tsx
import { Group as Group12, Stepper as Stepper2 } from "@mantine/core";
import { useMemo as useMemo6, useState as useState8 } from "react";
import { IconEye } from "@tabler/icons-react";

// app/features/overview/careerProgressionTile/SalaryChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// app/features/overview/careerProgressionTile/TooltipContent.tsx
import { Badge as Badge4 } from "@mantine/core";

// app/features/overview/careerProgressionTile/progressionUtil.ts
var getYLabel = (salary) => salary === void 0 ? "NA" : `\xA3${salary / 1e3}K`, getGradientLabel = (gradient) => gradient === void 0 ? "NA" : `\xA3${gradient}/yr`, getVerticalFill = (salaryProgression, minAge, maxAge) => salaryProgression.map(({ age }) => Number(age) >= Number(minAge) && Number(age) <= Number(maxAge) ? "pink" : "none"), getGradient = ({
  max,
  min,
  salaryProgression
}) => {
  if (!max || !min)
    return;
  let maxAge = Number(salaryProgression[salaryProgression.length - 1].age), minAge = Number(salaryProgression[0].age), years = maxAge - minAge;
  return (max - min) / years;
}, getSelectedItem = ({
  promotionTimeline,
  salaryProgression,
  activeIndex
}) => {
  if (activeIndex === void 0)
    return null;
  let { title, age } = promotionTimeline[activeIndex], [minAge, maxAge] = age.split("-"), minSalary = salaryProgression.find((item) => item.age === minAge), maxSalary = salaryProgression.find((item) => item.age === maxAge);
  return {
    startingMin: minSalary?.low,
    startingMax: minSalary?.high,
    finalMin: maxSalary?.low,
    finalMax: maxSalary?.high,
    title,
    minAge,
    maxAge
  };
};

// app/features/overview/careerProgressionTile/careerProgression.module.css
var careerProgression_module_default = { graphContainer: "_0CQnD", tooltip: "_6FhUx" };

// app/features/overview/careerProgressionTile/TooltipContent.tsx
import { jsxs as jsxs32 } from "react/jsx-runtime";
var TooltipContent = ({ payload }) => {
  let item = payload?.[0]?.payload;
  if (!item)
    return null;
  let {
    age,
    value: [high, low]
  } = item, average = (high + low) / 2;
  return /* @__PURE__ */ jsxs32("div", { className: careerProgression_module_default.tooltip, children: [
    /* @__PURE__ */ jsxs32(Badge4, { size: "md", children: [
      "Age: ",
      age
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "pink", size: "sm", children: [
      "Max: ",
      getYLabel(high)
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "gray", size: "sm", children: [
      "Min: ",
      getYLabel(low)
    ] }),
    /* @__PURE__ */ jsxs32(Badge4, { color: "green", size: "sm", children: [
      "Average: ",
      getYLabel(average)
    ] })
  ] });
};

// app/features/overview/careerProgressionTile/SalaryChart.tsx
import { jsx as jsx38, jsxs as jsxs33 } from "react/jsx-runtime";
var SalaryChart = ({ salaryProgression, minAge, maxAge }) => /* @__PURE__ */ jsx38("div", { className: careerProgression_module_default.graphContainer, children: /* @__PURE__ */ jsx38(ResponsiveContainer, { children: /* @__PURE__ */ jsxs33(
  AreaChart,
  {
    data: salaryProgression.map(({ age, high, low }) => ({ age, value: [high, low] })),
    children: [
      /* @__PURE__ */ jsx38(
        CartesianGrid,
        {
          strokeDasharray: "3 3",
          verticalFill: getVerticalFill(salaryProgression, minAge, maxAge)
        }
      ),
      /* @__PURE__ */ jsx38(Area, { type: "monotone", dataKey: "value", stroke: "#228be6", fill: "#228be6" }),
      /* @__PURE__ */ jsx38(XAxis, { dataKey: "age" }),
      /* @__PURE__ */ jsx38(YAxis, { tickFormatter: getYLabel }),
      /* @__PURE__ */ jsx38(Tooltip, { content: TooltipContent })
    ]
  }
) }) });

// app/features/overview/careerProgressionTile/SalaryCard.tsx
import { Card as Card4, Text as Text13 } from "@mantine/core";
import { jsx as jsx39, jsxs as jsxs34 } from "react/jsx-runtime";
var SalaryCard = ({
  startingMin,
  startingMax,
  finalMax,
  salaryProgression
}) => /* @__PURE__ */ jsx39(Card4, { padding: "lg", radius: "md", withBorder: !0, children: /* @__PURE__ */ jsxs34(Card4.Section, { withBorder: !0, inheritPadding: !0, py: "xs", children: [
  /* @__PURE__ */ jsxs34("div", { className: commonStyles_module_default.row, children: [
    /* @__PURE__ */ jsx39(Text13, { fw: "bold", children: "Starting Salary: " }),
    /* @__PURE__ */ jsxs34(Text13, { children: [
      getYLabel(startingMin),
      " - ",
      getYLabel(startingMax)
    ] })
  ] }),
  /* @__PURE__ */ jsxs34("div", { className: commonStyles_module_default.row, children: [
    /* @__PURE__ */ jsx39(Text13, { fw: "bold", children: "Salary Increase: " }),
    /* @__PURE__ */ jsxs34(Text13, { children: [
      getGradientLabel(getGradient({ max: finalMax, min: startingMax, salaryProgression })),
      " -",
      " ",
      getGradientLabel(getGradient({ max: startingMax, min: startingMin, salaryProgression }))
    ] })
  ] })
] }) });

// app/features/overview/careerProgressionTile/CareerProgressionTile.tsx
import { jsx as jsx40, jsxs as jsxs35 } from "react/jsx-runtime";
var CareerProgressionTile = ({
  promotionTimeline,
  salaryProgression
}) => {
  let [activeIndex, setActiveIndex] = useState8(), selectedItem = useMemo6(
    () => getSelectedItem({ promotionTimeline, salaryProgression, activeIndex }),
    [activeIndex]
  );
  return /* @__PURE__ */ jsxs35("div", { id: "progression", children: [
    /* @__PURE__ */ jsxs35("div", { className: commonStyles_module_default.row, children: [
      /* @__PURE__ */ jsx40(Group12, { py: "md", children: /* @__PURE__ */ jsx40(
        Stepper2,
        {
          iconSize: 32,
          orientation: "vertical",
          onStepClick: setActiveIndex,
          active: promotionTimeline.length,
          completedIcon: /* @__PURE__ */ jsx40(IconEye, {}),
          children: promotionTimeline.map(
            (item, index) => /* @__PURE__ */ jsx40(
              Stepper2.Step,
              {
                icon: /* @__PURE__ */ jsx40(IconEye, { size: "1rem" }),
                label: item.age,
                description: item.title,
                color: activeIndex === index ? "#faa2c1" : "navy"
              },
              `promotion-${item.age}`
            )
          )
        }
      ) }),
      /* @__PURE__ */ jsx40(
        SalaryChart,
        {
          salaryProgression,
          maxAge: selectedItem?.maxAge,
          minAge: selectedItem?.minAge
        }
      )
    ] }),
    selectedItem && /* @__PURE__ */ jsx40(SalaryCard, { salaryProgression, ...selectedItem })
  ] });
};

// app/features/overview/TopEmployersTile.tsx
import { Badge as Badge5, Grid as Grid4 } from "@mantine/core";
import { jsx as jsx41 } from "react/jsx-runtime";
var TopEmployersTile = ({ employers }) => /* @__PURE__ */ jsx41(Grid4, { py: "md", gutter: "md", id: "employers", children: employers.map(
  (employer) => /* @__PURE__ */ jsx41(Grid4.Col, { span: 2, children: /* @__PURE__ */ jsx41(Badge5, { size: "lg", className: commonStyles_module_default.lightNavyBg, children: employer }) }, employer)
) });

// app/features/overview/OverlapsTile.tsx
import { useEffect as useEffect12 } from "react";
import { Badge as Badge6, Card as Card5, Grid as Grid5, Group as Group13, Text as Text14 } from "@mantine/core";
import { jsx as jsx42, jsxs as jsxs36 } from "react/jsx-runtime";
var OverlapsTile = ({ careerOverlaps }) => {
  let dispatch = useAppDispatch(), industryColors = useAppSelector(selectIndustryColors);
  return useEffect12(() => {
    let industries = careerOverlaps.map(({ industry }) => industry);
    dispatch(addIndustryColors(industries));
  }, [careerOverlaps]), /* @__PURE__ */ jsx42(Grid5, { py: "sm", grow: !0, id: "overlaps", children: careerOverlaps.map(
    (item) => /* @__PURE__ */ jsx42(Grid5.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs36(Card5, { padding: "lg", radius: "md", withBorder: !0, h: "100%", children: [
      /* @__PURE__ */ jsx42(Card5.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsxs36(Group13, { justify: "space-between", children: [
        /* @__PURE__ */ jsx42(Text14, { fw: "bold", children: item.career }),
        /* @__PURE__ */ jsx42(Badge6, { color: industryColors[item.industry], children: item.industry })
      ] }) }),
      /* @__PURE__ */ jsx42(Text14, { py: "sm", children: item.reason })
    ] }) }, `overlap-${item.career}`)
  ) });
};

// app/features/overview/OverviewNavBar.tsx
import { NavLink as NavLink2 } from "@mantine/core";

// app/shared/hooks/useActiveNavScroll.ts
import { useEffect as useEffect13, useState as useState9 } from "react";
var useActiveNavScroll = ({ navItems, headerHeight: headerHeight2 = 150 }) => {
  let [activeAnchor, setActiveAnchor] = useState9(navItems[0].anchor), handleScroll = () => {
    let activeSection = navItems.reduce(
      (agg, { anchor }) => {
        let section = document.getElementById(anchor);
        if (!section)
          return agg;
        let { top } = section.getBoundingClientRect();
        return top < 0 ? agg : !agg.top || top < agg.top ? { anchor, top } : agg;
      },
      { anchor: "" }
    );
    activeSection.anchor ? setActiveAnchor(activeSection.anchor) : setActiveAnchor(navItems[navItems.length - 1].anchor);
  };
  useEffect13(() => {
    if (!(typeof document > "u" || typeof window > "u"))
      return window.addEventListener("scroll", handleScroll), () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);
  let scrollToTargetAdjusted = (targetId) => {
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
      let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition - headerHeight2,
        behavior: "smooth"
      });
    }
  };
  return typeof document > "u" ? { activeAnchor: "" } : (document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      let targetId = anchor.getAttribute("href")?.substring(1);
      targetId && scrollToTargetAdjusted(targetId);
    });
  }), { activeAnchor });
};

// app/shared/constants/overviewConstants.ts
import {
  IconBarbell,
  IconBuildingBank,
  IconCalendarTime,
  IconReportSearch as IconReportSearch2,
  IconTrendingUp,
  IconUsers
} from "@tabler/icons-react";
var overviewLinks = [
  { label: "Role Summary", Icon: IconReportSearch2, anchor: "role" },
  { label: "Sample Employers", Icon: IconUsers, anchor: "employers" },
  { label: "Career Progression", Icon: IconTrendingUp, anchor: "progression" },
  { label: "Preparation", Icon: IconBarbell, anchor: "preparation" },
  { label: "Application Timeline", Icon: IconCalendarTime, anchor: "timeline" },
  { label: "Similar Roles", Icon: IconBuildingBank, anchor: "overlaps" }
];

// app/features/overview/OverviewNavBar.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var OverviewNavBar = () => {
  let { activeAnchor } = useActiveNavScroll({ navItems: overviewLinks });
  return overviewLinks.map(({ label, Icon, anchor }) => /* @__PURE__ */ jsx43(
    NavLink2,
    {
      href: `#${anchor}`,
      active: activeAnchor === anchor,
      label,
      leftSection: /* @__PURE__ */ jsx43(Icon, {})
    },
    `link-${label}`
  ));
};

// app/features/overview/ProgressionTile.tsx
import { Card as Card6, Group as Group14, Text as Text15 } from "@mantine/core";
import { IconArrowBigDownLines } from "@tabler/icons-react";
import { jsx as jsx44, jsxs as jsxs37 } from "react/jsx-runtime";
var getMappedList = (progressionList) => progressionList.reduce((agg, item) => {
  let existingYear = agg.find((aggItem) => aggItem.title === item.title);
  return existingYear ? agg.map(
    (aggItem) => aggItem.title === existingYear.title ? { ...aggItem, descriptions: [...existingYear.descriptions, ...item.descriptions] } : aggItem
  ) : [...agg, item];
}, []), ProgressionTile = ({
  progressionList,
  id
}) => {
  let mappedList = getMappedList(progressionList), { isMobile } = useMobileStyles();
  return /* @__PURE__ */ jsx44(Group14, { py: "md", id, children: mappedList.map(
    (item, index) => /* @__PURE__ */ jsxs37(Group14, { justify: "center", display: "flex", w: "100%", children: [
      /* @__PURE__ */ jsxs37(Card6, { shadow: "sm", padding: "lg", radius: "md", withBorder: !0, w: "100%", children: [
        /* @__PURE__ */ jsx44(
          Card6.Section,
          {
            withBorder: !0,
            inheritPadding: !0,
            py: "xs",
            fw: "bold",
            variant: "light",
            className: commonStyles_module_default.lightNavyBg,
            children: item.title
          }
        ),
        /* @__PURE__ */ jsx44("div", { className: commonStyles_module_default.row, children: item.descriptions.map(
          (description) => /* @__PURE__ */ jsx44(
            Text15,
            {
              w: isMobile ? "100%" : `${100 / item.descriptions.length}%`,
              children: description
            },
            `description-${description}`
          )
        ) })
      ] }),
      index !== mappedList.length - 1 && /* @__PURE__ */ jsx44(IconArrowBigDownLines, { size: 40, color: "navy" })
    ] }, `progression-${item.title}`)
  ) });
};

// app/features/overview/RoleSummaryTile.tsx
import { Card as Card7, Grid as Grid6, Text as Text16 } from "@mantine/core";
import { jsx as jsx45, jsxs as jsxs38 } from "react/jsx-runtime";
var RoleSummaryTile = ({
  responsibilities,
  dayToDay,
  skills,
  personalityType
}) => /* @__PURE__ */ jsx45(Grid6, { py: "sm", grow: !0, id: "role", children: [
  { content: responsibilities, title: "Responsibilities" },
  { content: dayToDay, title: "Day to Day" },
  { content: skills, title: "Skills" },
  { content: personalityType, title: "Personality Type" }
].map(
  ({ title, content }) => /* @__PURE__ */ jsx45(Grid6.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs38(Card7, { padding: "lg", radius: "md", withBorder: !0, h: "100%", children: [
    /* @__PURE__ */ jsx45(Card7.Section, { withBorder: !0, inheritPadding: !0, py: "xs", className: commonStyles_module_default.lightNavyBg, children: /* @__PURE__ */ jsx45(Text16, { fw: "bold", children: title }) }),
    /* @__PURE__ */ jsx45(Text16, { py: "md", children: content })
  ] }) }, `role-${title}`)
) });

// app/routes/overview.$.tsx
import { Fragment as Fragment7, jsx as jsx46, jsxs as jsxs39 } from "react/jsx-runtime";
var loader3 = async ({ params }) => ({ careerId: params["*"] }), Index3 = () => {
  let { careerId: careerIdUrl } = useLoaderData3(), { loading, unauthenticated } = usePageSetup(), { isMobile } = useMobileStyles(), profileId = useAppSelector(selectProfileId) || "", navigate = useNavigate4(), careerId = useAppSelector(selectSelectedCareerPathId), careerPath = useAppSelector(selectSelectedCareerPath), { data, isFetching } = useGetCareerOverviewQuery(
    { careerId, profileId },
    { skip: !profileId || !careerId }
  );
  return loading ? /* @__PURE__ */ jsx46(LoadingLens, {}) : unauthenticated ? (navigate(urls.landingPage), null) : isFetching ? /* @__PURE__ */ jsx46(Shell, { navbar: isMobile ? void 0 : /* @__PURE__ */ jsx46(OverviewNavBar, {}), children: /* @__PURE__ */ jsx46(
    LoaderWithText,
    {
      text: [
        `Fetching insights for ${careerPath?.title}...`,
        "This can take up to 30 seconds..."
      ]
    }
  ) }) : /* @__PURE__ */ jsx46(Shell, { navbar: isMobile ? void 0 : /* @__PURE__ */ jsx46(OverviewNavBar, {}), children: /* @__PURE__ */ jsx46(Fragment7, { children: overviewLinks.map(({ label, Icon, anchor }) => data ? /* @__PURE__ */ jsx46(Container10, { py: "md", children: /* @__PURE__ */ jsxs39(Card8, { padding: "lg", radius: "md", withBorder: !0, children: [
    /* @__PURE__ */ jsx46(Card8.Section, { withBorder: !0, inheritPadding: !0, py: "xs", bg: "navy", c: "white", children: /* @__PURE__ */ jsxs39(Group15, { children: [
      /* @__PURE__ */ jsx46(Icon, { size: 35, stroke: 1 }),
      /* @__PURE__ */ jsx46(Text17, { fw: "bold", size: "xl", children: label })
    ] }) }),
    anchor === "role" && /* @__PURE__ */ jsx46(RoleSummaryTile, { ...data.roleSummary }),
    anchor === "employers" && /* @__PURE__ */ jsx46(TopEmployersTile, { employers: data.exampleEmployers }),
    anchor === "progression" && /* @__PURE__ */ jsx46(
      CareerProgressionTile,
      {
        promotionTimeline: data.promotionTimeline,
        salaryProgression: data.salaryProgression
      }
    ),
    anchor === "preparation" && /* @__PURE__ */ jsx46(
      ProgressionTile,
      {
        progressionList: data.supplementalExperiences.map((item) => ({
          title: `Year ${item.year}`,
          descriptions: [item.activity]
        })),
        id: "preparation"
      }
    ),
    anchor === "timeline" && /* @__PURE__ */ jsx46(
      ProgressionTile,
      {
        progressionList: data.assessmentStages.map((item, index) => ({
          title: `${index + 1} ${item.stage}`,
          descriptions: [item.description]
        })),
        id: "timeline"
      }
    ),
    anchor === "overlaps" && /* @__PURE__ */ jsx46(OverlapsTile, { careerOverlaps: data.careerOverlaps })
  ] }) }, `career-${label}`) : null) }) });
}, overview_default = Index3;

// app/routes/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  default: () => settings_default
});
import { Card as Card9, Container as Container11, NavLink as NavLink3 } from "@mantine/core";
import { useState as useState11 } from "react";

// app/features/settings/ProfileTab.tsx
import classNames6 from "classnames";
import { useState as useState10 } from "react";
import { Button as Button9, Group as Group16, Tabs, Text as Text18, TextInput as TextInput3 } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

// app/features/settings/settingsStyles.module.css
var settingsStyles_module_default = { accountTab: "coi3L" };

// app/features/settings/ProfileTab.tsx
import { jsx as jsx47, jsxs as jsxs40 } from "react/jsx-runtime";
var DetailsTab = () => {
  let { user } = useAuthUser();
  return /* @__PURE__ */ jsxs40("div", { children: [
    /* @__PURE__ */ jsx47(TextInput3, { label: "Email", value: user?.attributes?.email, disabled: !0 }),
    /* @__PURE__ */ jsx47(TextInput3, { value: user?.attributes?.name, label: "Name", disabled: !0 })
  ] });
}, AccountTab = () => {
  let { isMobile } = useMobileStyles(), { loading, deleteAccount } = useAuthUser(), [deleteText, setDeleteText] = useState10("");
  return /* @__PURE__ */ jsxs40("div", { children: [
    /* @__PURE__ */ jsxs40("div", { className: classNames6(commonStyles_module_default.row, settingsStyles_module_default.accountTab), children: [
      /* @__PURE__ */ jsx47(IconExclamationCircle, { color: "red", size: 40 }),
      /* @__PURE__ */ jsx47(Text18, { fw: "bold", children: "Deleting your account will remove your saved careers, interview quesitons, and mentor network." })
    ] }),
    /* @__PURE__ */ jsxs40(Group16, { py: "lg", display: "flex", justify: isMobile ? "center" : "flex-start", align: "flex-end", children: [
      /* @__PURE__ */ jsx47(
        TextInput3,
        {
          value: deleteText,
          label: "Type DELETE to confirm",
          onChange: ({ target: { value } }) => setDeleteText(value)
        }
      ),
      /* @__PURE__ */ jsx47(
        Button9,
        {
          color: "red",
          disabled: deleteText !== "DELETE" || loading,
          variant: "outline",
          onClick: deleteAccount,
          loading,
          children: "Delete Profile"
        }
      )
    ] })
  ] });
}, tabs = [
  { label: "Details", Component: DetailsTab },
  { label: "Account", Component: AccountTab }
], ProfileTab = () => /* @__PURE__ */ jsxs40(Tabs, { defaultValue: tabs[0].label, children: [
  /* @__PURE__ */ jsx47(Tabs.List, { children: tabs.map(
    ({ label }) => /* @__PURE__ */ jsx47(Tabs.Tab, { value: label, children: label }, `tab-${label}`)
  ) }),
  tabs.map(
    ({ label, Component }) => /* @__PURE__ */ jsx47(Tabs.Panel, { value: label, pt: "md", children: /* @__PURE__ */ jsx47(Component, {}) }, `panel-${label}`)
  )
] });

// app/features/settings/UserInfoTab.tsx
import { Select as Select5, Tabs as Tabs2, TextInput as TextInput4, Textarea as Textarea5 } from "@mantine/core";
import { jsx as jsx48, jsxs as jsxs41 } from "react/jsx-runtime";
var UniversitiesTab = ({ profile }) => {
  let universities = [profile.latestDegree, ...profile.additionalDegrees];
  return /* @__PURE__ */ jsx48("div", { children: universities.map(
    (university) => /* @__PURE__ */ jsxs41("div", { children: [
      /* @__PURE__ */ jsxs41("div", { className: commonStyles_module_default.row, children: [
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "University Name", value: university.university, disabled: !0 }),
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Course Name", value: university.name, disabled: !0 })
      ] }),
      /* @__PURE__ */ jsxs41("div", { className: commonStyles_module_default.row, children: [
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Achieve/Expected Grade", value: university.grade, disabled: !0 }),
        /* @__PURE__ */ jsx48(TextInput4, { w: "50%", label: "Level", value: university.level, disabled: !0 })
      ] }),
      /* @__PURE__ */ jsx48(TextInput4, { label: "Course Summary", value: university.ratingReason, disabled: !0 })
    ] }, `experience-${university.university}`)
  ) });
}, ExperiencesTab = ({ profile }) => /* @__PURE__ */ jsx48("div", { children: profile.previousWorkExperience.map(
  (experience) => /* @__PURE__ */ jsxs41("div", { children: [
    /* @__PURE__ */ jsx48(TextInput4, { label: "Company Name", value: experience.experienceName, disabled: !0 }),
    /* @__PURE__ */ jsx48(
      Select5,
      {
        label: "Experience Type",
        value: experience.experienceType,
        data: experienceOptions,
        disabled: !0
      }
    ),
    /* @__PURE__ */ jsx48(TextInput4, { label: "Role", value: experience.role, disabled: !0 }),
    /* @__PURE__ */ jsx48(Textarea5, { label: "Experience summaey", value: experience.ratingReason, disabled: !0 })
  ] }, `experience-${experience.experienceName}`)
) }), tabs2 = [
  { label: "Universities", Component: UniversitiesTab },
  { label: "Experiences", Component: ExperiencesTab }
], UserInfoTab = () => {
  let profile = useAppSelector(selectProfile);
  return profile ? /* @__PURE__ */ jsxs41(Tabs2, { defaultValue: tabs2[0].label, children: [
    /* @__PURE__ */ jsx48(Tabs2.List, { children: tabs2.map(
      ({ label }) => /* @__PURE__ */ jsx48(Tabs2.Tab, { value: label, children: label }, `tab-${label}`)
    ) }),
    tabs2.map(
      ({ label, Component }) => /* @__PURE__ */ jsx48(Tabs2.Panel, { value: label, pt: "md", children: /* @__PURE__ */ jsx48(Component, { profile }) }, `panel=${label}`)
    )
  ] }) : null;
};

// app/routes/settings.tsx
import { jsx as jsx49 } from "react/jsx-runtime";
var profileLinks = [
  { label: "Profile", Component: ProfileTab },
  { label: "User Info", Component: UserInfoTab }
], Index4 = () => {
  let [activeTab, setActiveTab] = useState11(0), { Component } = profileLinks[activeTab];
  return /* @__PURE__ */ jsx49(
    Shell,
    {
      navbar: /* @__PURE__ */ jsx49("div", { children: profileLinks.map(({ label }, index) => /* @__PURE__ */ jsx49(
        NavLink3,
        {
          label,
          active: activeTab === index,
          onClick: () => setActiveTab(index)
        },
        `link-${label}`
      )) }),
      children: /* @__PURE__ */ jsx49(Container11, { py: "md", children: /* @__PURE__ */ jsx49(Card9, { radius: "md", p: "md", withBorder: !0, children: /* @__PURE__ */ jsx49(Component, {}) }) })
    }
  );
}, settings_default = Index4;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
import classNames8 from "classnames";

// app/shared/components/featureSlider/FeatureSlider.tsx
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Container as Container12, Image as Image3, Title } from "@mantine/core";

// app/shared/components/featureSlider/featureSlider.module.css
var featureSlider_module_default = { container: "-Aoqf", controls: "_7KTBS", root: "fyn2R", indicator: "KcwqU", title: "zrAV2", slide: "-Yajt" };

// app/shared/components/featureSlider/FeatureSlider.tsx
import { jsx as jsx50, jsxs as jsxs42 } from "react/jsx-runtime";
var FeatureSlider = ({ slides }) => {
  let { isMobile } = useMobileStyles(), autoplay = useRef(Autoplay({ delay: 2e3 }));
  return /* @__PURE__ */ jsx50(Container12, { className: featureSlider_module_default.container, children: /* @__PURE__ */ jsx50(
    Carousel,
    {
      classNames: featureSlider_module_default,
      withIndicators: !0,
      height: isMobile ? 300 : 500,
      loop: !0,
      plugins: [autoplay.current],
      onMouseEnter: autoplay.current.stop,
      onMouseLeave: autoplay.current.reset,
      children: slides.map(
        ({ title, subTitle, image }) => /* @__PURE__ */ jsxs42(Carousel.Slide, { className: featureSlider_module_default.slide, children: [
          /* @__PURE__ */ jsxs42("div", { className: featureSlider_module_default.title, children: [
            /* @__PURE__ */ jsxs42(Title, { children: [
              title,
              " "
            ] }),
            /* @__PURE__ */ jsx50(Title, { c: "navy", children: subTitle })
          ] }),
          /* @__PURE__ */ jsx50(Image3, { src: image, radius: "md" })
        ] }, `slide-${title}`)
      )
    }
  ) });
};

// app/features/landingPage/HomeTiles.tsx
import { useNavigate as useNavigate5 } from "@remix-run/react";
import { Card as Card10, Container as Container13, Grid as Grid7, Group as Group17, Text as Text19, Tooltip as Tooltip2 } from "@mantine/core";
import classNames7 from "classnames";

// app/features/landingPage/landingPage.module.css
var landingPage_module_default = { footer: "kMSdh", title: "v94j7", container: "yzySm", homeTile: "EN4mb", left: "XFFGO", right: "fM6t1" };

// app/features/landingPage/HomeTiles.tsx
import { jsx as jsx51, jsxs as jsxs43 } from "react/jsx-runtime";
var HomeTiles = () => {
  let dispatch = useAppDispatch(), { authenticated } = useAuthUser(), navigate = useNavigate5(), profile = useAppSelector(selectProfile), careerPaths = useAppSelector(selectCareerPaths), handleClick = (link) => {
    if (link === urls.careersTest) {
      careerPaths || dispatch(setCareerTestModal({ open: !0, noProfile: !1 })), navigate(link);
      return;
    }
    if (!authenticated) {
      dispatch(setCareerTestModal({ open: !0, noProfile: !0 }));
      return;
    }
    if ([urls.mentors, urls.jobs].includes(link) && !profile?.diversity) {
      dispatch(setDiversityModal({ open: !0 }));
      return;
    }
    if ([urls.overview, urls.questions].includes(link) && !careerPaths) {
      dispatch(setCareerTestModal({ open: !0, noProfile: !0 }));
      return;
    }
    navigate(link);
  };
  return /* @__PURE__ */ jsx51(Container13, { py: 0, children: /* @__PURE__ */ jsx51(Grid7, { py: "sm", id: "mentors-grid", children: featureTiles.map(
    ({ title, Icon, link, description, disabled }) => /* @__PURE__ */ jsx51(
      Tooltip2,
      {
        label: `${title} Coming Soon`,
        id: `home-tile-${title}`,
        disabled: !disabled,
        children: /* @__PURE__ */ jsx51(Grid7.Col, { span: { md: 6 }, children: /* @__PURE__ */ jsxs43(
          Card10,
          {
            onClick: () => !disabled && handleClick(link),
            padding: "sm",
            radius: "md",
            withBorder: !0,
            h: "100%",
            className: classNames7(commonStyles_module_default.hoverItem, {
              [commonStyles_module_default.disabled]: disabled
            }),
            children: [
              /* @__PURE__ */ jsx51(
                Card10.Section,
                {
                  withBorder: !0,
                  inheritPadding: !0,
                  py: "xs",
                  className: commonStyles_module_default.lightNavyBg,
                  children: /* @__PURE__ */ jsx51(Text19, { fw: "bold", children: title })
                }
              ),
              /* @__PURE__ */ jsxs43("div", { className: landingPage_module_default.homeTile, children: [
                /* @__PURE__ */ jsx51(Group17, { className: landingPage_module_default.left, children: /* @__PURE__ */ jsx51(Icon, { size: 80, stroke: 1 }) }),
                /* @__PURE__ */ jsx51(Group17, { className: landingPage_module_default.right, children: /* @__PURE__ */ jsx51(Text19, { size: "sm", children: description }) })
              ] })
            ]
          }
        ) })
      },
      `home-tile-${title}`
    )
  ) }) });
};

// app/assets/careerResults.png
var careerResults_default = "/build/_assets/careerResults-IBWDKUKK.png";

// app/assets/interviewQuestion.png
var interviewQuestion_default = "/build/_assets/interviewQuestion-IXIH7TL6.png";

// app/assets/careerTest.png
var careerTest_default = "/build/_assets/careerTest-3NZG5C5Q.png";

// app/assets/industryInsights.png
var industryInsights_default = "/build/_assets/industryInsights-B4A3K24F.png";

// app/assets/network.png
var network_default = "/build/_assets/network-27EU5YPF.png";

// app/shared/constants/landingPageConstants.ts
var landingPageSlides = [
  {
    title: "Take A Quick",
    subTitle: "Career26 Test",
    image: careerTest_default
  },
  {
    title: "Get Your",
    subTitle: "Personalised Career Advice",
    image: careerResults_default
  },
  {
    title: "Explore Industry",
    subTitle: "Insights and Guidance",
    image: industryInsights_default
  },
  {
    title: "Practice Interviews",
    subTitle: "With Real-time Feedback",
    image: interviewQuestion_default
  },
  {
    title: "Find A Mentor",
    subTitle: "In Our Global Network",
    image: network_default
  }
];

// app/routes/_index.tsx
import { jsx as jsx52, jsxs as jsxs44 } from "react/jsx-runtime";
var Index5 = () => {
  let { loading, authenticated } = usePageSetup();
  return loading ? /* @__PURE__ */ jsx52(LoadingLens, {}) : /* @__PURE__ */ jsx52(Shell, { children: /* @__PURE__ */ jsxs44("div", { className: classNames8({ [landingPage_module_default.container]: !authenticated }), children: [
    !authenticated && /* @__PURE__ */ jsx52(FeatureSlider, { slides: landingPageSlides }),
    /* @__PURE__ */ jsx52(HomeTiles, {})
  ] }) });
}, index_default = Index5;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-HP35LDN4.js", imports: ["/build/_shared/chunk-R7DKMHBB.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-XHWLKD67.js", imports: ["/build/_shared/chunk-5NMT3SXO.js", "/build/_shared/chunk-LK2IODK6.js", "/build/_shared/chunk-2W7QTXDV.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-QFQ6LZOP.js", imports: ["/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/career-test": { id: "routes/career-test", parentId: "root", path: "career-test", index: void 0, caseSensitive: void 0, module: "/build/routes/career-test-KLNHFDT2.js", imports: ["/build/_shared/chunk-R3UJVCPU.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/overview.$": { id: "routes/overview.$", parentId: "root", path: "overview/*", index: void 0, caseSensitive: void 0, module: "/build/routes/overview.$-IMK5EG56.js", imports: ["/build/_shared/chunk-R3UJVCPU.js", "/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/questions.$": { id: "routes/questions.$", parentId: "root", path: "questions/*", index: void 0, caseSensitive: void 0, module: "/build/routes/questions.$-S77ORB3C.js", imports: ["/build/_shared/chunk-QTXYYKK6.js", "/build/_shared/chunk-WFOEOJ23.js", "/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/settings": { id: "routes/settings", parentId: "root", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/settings-YB4FAWYE.js", imports: ["/build/_shared/chunk-EKS5ZLJE.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "fb4d3724", hmr: void 0, url: "/build/manifest-FB4D3724.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/career-test": {
    id: "routes/career-test",
    parentId: "root",
    path: "career-test",
    index: void 0,
    caseSensitive: void 0,
    module: career_test_exports
  },
  "routes/questions.$": {
    id: "routes/questions.$",
    parentId: "root",
    path: "questions/*",
    index: void 0,
    caseSensitive: void 0,
    module: questions_exports
  },
  "routes/overview.$": {
    id: "routes/overview.$",
    parentId: "root",
    path: "overview/*",
    index: void 0,
    caseSensitive: void 0,
    module: overview_exports
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
