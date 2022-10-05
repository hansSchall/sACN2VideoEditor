import { sACN2VideoLocalInstance } from "../components/sacn2video/localinstance";
import { sACN2VideoRemoteInstance } from "../components/sacn2video/remoteinstance";

export async function script_startup() {
    new sACN2VideoLocalInstance("c:/hans/technik/theater2022/test.s2v", 8001, "Test");
    new sACN2VideoLocalInstance("c:/hans/technik/theater2022/left.s2v", 8002, "Left");
    new sACN2VideoLocalInstance("c:/hans/technik/theater2022/right.s2v", 8003, "Right");
    // new sACN2VideoRemoteInstance("10.101.111.2", 8001, "Right")
}
