import CustomIcon from '@components/ui/custom-icon';


export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <i>
        <CustomIcon
          className='h-20 w-20 text-[#1DA1F2]'
          iconName='TwitterIcon'
        />
      </i>
    </main>
  );
}
