import { forwardRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface AreYouSureProps {
  title?: string;
  description?: string;
  onClick: () => void;
  loading?: boolean;
}

const AreYouSure = forwardRef<HTMLButtonElement, AreYouSureProps>(
  (props, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" ref={ref} className="hidden">
            Show Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {props.title || "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {props.description || (
                <>
                  This action cannot be undone. This will permanently delete the
                  post and remove your data from our servers.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={props.onClick} disabled={props.loading}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

AreYouSure.displayName = "AreYouSure";
export default AreYouSure;
