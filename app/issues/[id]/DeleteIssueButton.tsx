import { Button } from '@radix-ui/themes'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  console.log('issueId: ', issueId)
  return <Button color='red'>Delete Issue</Button>
}

export default DeleteIssueButton
