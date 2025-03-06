import Button from '../components/button';
import Input from '../components/input';

export default function HomePage() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-dvh">
            <div className="max-w-sm w-sm">
                <Button className="mb-3">Create a room</Button>
                <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <div className='bg-gray-300 h-px flex-1' />
                    <span>or</span>
                    <div className='bg-gray-300 h-px flex-1'/>
                </div>
                <form>
                    <label htmlFor='room_id' className='text-sm font-medium'>Type a Room ID to join</label>
                    <Input type="text" name="room_id" placeholder="ABCDF!@#$" />
                    <Button type="submit">Join room</Button>
                </form>
            </div>
        </div>
    )
}