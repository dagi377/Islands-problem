const regCaptureNumbers = /(\d+)([^\d]+)(\d+)/
export const getBitMap = function (value) {
	const regResult = new RegExp(regCaptureNumbers).exec(value)
	if (!regResult) {
		return false
	}
	return [parseInt(regResult[1]), parseInt(regResult[3])]
}
