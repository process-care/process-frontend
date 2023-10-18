import { Button } from "@chakra-ui/react"

import { t } from "@/static/global.ts"
import ButtonIcon from "@/components/ButtonIcon"
import { Trash2Icon } from "lucide-react"

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  onDelete?: () => void;
  hideDelete?: boolean;
}

export default function Footer({
  onCancel,
  disabled,
  onSubmit,
  onDelete,
  hideDelete,
}:Props ): JSX.Element {
  return (
    <div className="w-full py-4 px-10 flex flex-row-reverse justify-between items-center bg-white border-t border-t-solid border-t-black min-w-[300px]">
      {/* Action group */}
      <div>
        <Button variant="link" onClick={onCancel} type="button" mr="20">
          {t.cancel}
        </Button>
        
        <Button
          type="submit"
          variant="rounded"
          w="128px"
          disabled={disabled}
          onClick={onSubmit}
        >
          {t.validate}
        </Button>
      </div>

      {/* Delete */}
      {!hideDelete && (
        <ButtonIcon
          icon={Trash2Icon}
          onClick={() => !!onDelete && onDelete()}
          type="plain"
        />
      )}
    </div>
  );
};
