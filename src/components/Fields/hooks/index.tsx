import { Maybe } from "api/graphql/types.generated";
import { useField } from "formik";
import React, { useState } from "react";

export interface Factor {
  modalities: {
    file: any;
    description: string;
  }[];
  title: string;
}

interface State {
  variations: number[][][];
  isMounted: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssociatedLogic = (
  factors: Factor[],
  name: string,
  maxLoop: Maybe<number> | undefined,
  TOTAL_CARDS: number
) => {
  const [field, , helpers] = useField(name);

  const [state, setState] = useState<State>({
    variations: [],
    isMounted: false,
  });
  const [totalClick, setClick] = useState(0);
  const filteredFactors = factors?.filter((f) => f !== null);
  const modalitiesPerFactor = filteredFactors?.map((f) => f.modalities?.length).filter((m) => m !== 0);
  const totalVariations = modalitiesPerFactor?.reduce((a, b) => a * b, 1);

  const getMaxVariation: any = (n: number, k: number) => {
    const factorialize: any = (num: number) => {
      if (num < 0) return -1;
      else if (num === 0) return 1;
      else {
        return num * factorialize(num - 1);
      }
    };

    const _A = (n: number, k: number) => {
      return factorialize(n) / factorialize(n - k);
    };

    return _A(n, k) / factorialize(k);
  };

  const maxVariations = React.useMemo(() => {
    if (totalVariations) return getMaxVariation(totalVariations, TOTAL_CARDS);
  }, [totalVariations]);

  const generate = () => {
    if (maxVariations - 1 === state.variations.length) {
      return;
    }
    if (!modalitiesPerFactor) {
      return;
    }
    const randomize = () => {
      return modalitiesPerFactor?.map((m) => Math.floor(Math.random() * m));
    };

    const card1 = randomize();
    const card2 = randomize();

    const variation = [card1, card2];

    const cardsAreSame = (arrA: number[], arrB: number[]) => {
      return JSON.stringify(arrA) === JSON.stringify(arrB);
    };

    if (cardsAreSame(card1, card2)) {
      generate();
    } else if (
      state.variations.some((v) => JSON.stringify(v) === JSON.stringify(variation)) ||
      state.variations.some((v) => JSON.stringify(v) === JSON.stringify(variation.reverse()))
    ) {
      generate();
    } else {
      setState({
        ...state,
        variations: [...state.variations, variation],
        isMounted: true,
      });
    }
  };
  const handleClick = (cardIdx: number, values?: any) => {
    generate();
    setClick(totalClick + 1);

    const formatPayload = () => {
      const lastVariation = state.variations[state.variations.length - 1];

      const format = (el: number) => {
        return filteredFactors?.map((f, idx) => {
          return {
            [f.title]: f.modalities[lastVariation[el][idx]].description,
          };
        });
      };

      // If values !== undefined, it means that the we are on MonoThumbnail, we dont need choice but we need associated_input

      if (values) {
        const isRadiobox = Boolean(values.attributes.radio);
        return {
          variations: [...Array(TOTAL_CARDS)].map((_, idx) => format(idx))[0],
          associated_input: values,

          value: isRadiobox ? values.attributes.radio : values[values.attributes.type],
        };
      } else
        return {
          variations: [...Array(TOTAL_CARDS)].map((_, idx) => format(idx)),
          choice: cardIdx,
        };
    };

    if (!field.value) {
      helpers.setValue([formatPayload()]);
    } else {
      helpers.setValue([...field.value, formatPayload()]);
    }
  };

  // console.group("Algos");
  // console.log("maxVariations", maxVariations); // 27
  // console.log("maxLoop", maxLoop); // 4
  // console.log("totalClick", totalClick); // 0
  // console.groupEnd();

  // TODO: refactor this

  const isFinished =
    maxLoop &&
    (totalClick === (maxVariations - 1 > maxLoop ? maxLoop : maxVariations) ||
      field.value?.length === (maxLoop || maxVariations));

  const checkIsFinished = () => {
    const loop = typeof maxLoop === "string" && parseInt(maxLoop);
    const hadValue = field.value?.length > 0;
    const valueLenght = field.value?.length;
    const limit = loop > maxVariations ? maxVariations : loop;

    if (hadValue) {
      return valueLenght === limit;
    } else {
      return totalClick === limit;
    }
  };

  return {
    generate,
    handleClick,
    setState,
    state,
    filteredFactors,
    totalClick,
    maxVariations,
    isFinished,
    checkIsFinished,
  };
};
