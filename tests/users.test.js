import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController.js'

test('Get all the users from the collection', done => {
	function getUsers(data) {
		try {
			expect(data).toBe('JSON');
			done();
		} catch (err) {
			done(err)
		}
	}
})