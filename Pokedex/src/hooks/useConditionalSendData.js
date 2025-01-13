import useDbManagment from './useDbManagment';

const useConditionalSendData = () => {
	const { updateData, postData } = useDbManagment();

	const sendData = async (checkList, path, data) => {
		const check = checkList.map((obj) => obj.id).includes(data.id);
		try {
			(await check)
				? updateData(`${path}/${data.id}`, data)
				: postData(path, data);
		} catch (e) {
			console.log(e);
		}
	};
	return { sendData };
};

export default useConditionalSendData;
