import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserProps {
  userInfo: {
    name: string;
    language: string;
    userSubmisson: [
      {
        sourceCode: string;
        input: string;
        Date: string;
        output: string;
      }
    ];
  };
}
const UserTable = ({ userInfo }: UserProps) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent submissons.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Stdin</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
            <TableHead className="text-right">Code</TableHead>
            <TableHead className="text-right">Stdout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-t border-muted">
          {userInfo
            ? userInfo.userSubmisson?.map((submisson) => (
                <TableRow className="bg-muted/40 hover:bg-secondary ">
                  <TableCell className="font-medium">{userInfo.name}</TableCell>
                  <TableCell>{userInfo.language}</TableCell>
                  <TableCell>
                    {submisson?.input?.length > 0
                      ? atob(submisson.input)
                      : "null"}
                  </TableCell>
                  <TableCell className="text-right">{submisson.Date}</TableCell>
                  <TableCell className="text-right ">
                    {submisson.sourceCode.length > 0
                      ? submisson.sourceCode.slice(0, 100)
                      : null}
                  </TableCell>
                  <TableCell className="text-right">
                    {atob(submisson.output)}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
