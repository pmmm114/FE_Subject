import {
  Dialog as ShadcnDialog,
  DialogContent as ShadcnDialogContent,
  DialogTrigger as ShadcnDialogTrigger,
} from '@libs/shared/shadcn-ui/ui/components/ui/dialog';
import { getComponentTypeCheck } from '@libs/shared/utils/react/component/composition';
const DialogTrigger: React.FC<
  React.ComponentPropsWithoutRef<typeof ShadcnDialogTrigger>
> = (props) => {
  return <ShadcnDialogTrigger {...props} />;
};

const DialogContent: React.FC<
  React.ComponentPropsWithoutRef<typeof ShadcnDialogContent>
> = (props) => {
  return <ShadcnDialogContent {...props} />;
};
function Dialog({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof ShadcnDialog>) {
  const _trigger = getComponentTypeCheck({ children }, DialogTrigger.name);
  const _content = getComponentTypeCheck({ children }, DialogContent.name);
  return (
    <ShadcnDialog {...rest}>
      {_trigger}
      {_content}
    </ShadcnDialog>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;

export default Dialog;
