import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
import { container, injectable } from 'tsyringe';

@injectable()
export default class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);

        const user_id = request.user.id;

        const profileUser = await showProfileService.execute({ user_id });

        return response.json(instanceToInstance(profileUser));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const updateProfileService = container.resolve(UpdateProfileService);
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        const updateProfile = await updateProfileService.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });

        return response.json(instanceToInstance(updateProfile));
    }
}
