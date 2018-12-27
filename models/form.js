const knex = require('knex')(require('../db/dbconfig')) 

const getForm= async ()=> {
  try { 
    const result = await knex('surveyform').orderBy('id')
    if (result.length == 0) throw new Error("Not found or form is null")
    return result
  } catch (err) {
    throw err
  }
}

const deleteForm= async ()=> {
  try { 
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
    await knex('reportofstudent').del()
    await knex('surveyform').del()
    return "OK"
  } catch (err) {
    throw err
  }
}

const createForm= async (data)=> {
  try { 
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
  	var maxIndex= await knex('surveyform').max('id')
    index=maxIndex[0]["max(`id`)"]
    if(index==null) index=0
    input =data.map(function (r) {
      ++index
      return {
        id:index,
        criteria: r
      }
    })
	await knex('surveyform').insert(input)
	return ("OK")
  } catch (err) { 
    throw err
  }
}

const checkUpdateForm= async()=>{
	try { 
	  result=await knex('coursesoflecturers').select()
	  if (result.length == 0) return true 
	  else return false
  } catch (err) {
    throw err
  }
}

const deleteCriteria = async function(id){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")
    await knex('reportofstudent').where({"criteria_id": id}).del()
    await knex('surveyform').where({"id": id}).del()
    return ("OK")
  } catch (err) {
    throw err
  }
} 

const createCriteria = async function(criteria){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")  
    var maxIndex= await knex('surveyform').max('id')
    index=maxIndex[0]["max(`id`)"]
    if(index==null) index=0
    else index++
    await knex('surveyform').insert({"criteria":criteria,"id":index})
    return ("OK")
  } catch (err) {
    throw err
  }
} 

const editCriteria = async function(id,criteria){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")    
    await knex('surveyform').where("id", id).update("criteria",criteria)
    return ("OK")
  } catch (err) {
    throw err
  }
} 

const reset = async function(){
  try {
    result=await knex('coursesoflecturers').select()
    if (result.length != 0) throw new Error("Can't update, please checkUpdateForm ")  
    const form = [
  {
    criteria: "Giảng đường đáp ứng yêu cầu của môn học",
    id: 1
  },
  {
    criteria: "Các trang thiết bị tại giảng đường đáp ứng nhu cầu học tập và giảng dạy",
    id: 2
  },
  {
    criteria: "Bạn được hỗ trợ kịp thời trong quá trình học môn này",
    id: 3
  },
  {
    criteria: "Mục tiêu của môn học nêu rõ kiến thức và kỹ năng người học cần đạt được",
    id: 4
  },
  {
    criteria: "Thời lượng môn học được phân bố hợp lý cho các hình thức học tập",
    id: 5
  },
  {
    criteria: "Các tài liệu phục vụ môn học được cập nhật",
    id: 6
  },
  {
    criteria: "Môn học góp phần trang bị kiến thức, kỹ năng nghề nghiệp cho bạn",
    id: 7
  },
  {
    criteria: "Giảng viên thực hiện đầy đủ nội quy và thời lượng của môn học theo kế hoạch",
    id: 8
  },
  {
    criteria: "Giảng viên hướng dẫn bạn phương pháp học tập khi bắt đầu môn học",
    id: 9
  },
  {
    criteria: "Phương pháp giảng dạy của giảng viên giúp bạn phát triển tư duy",
    id: 10
  },
  {
    criteria: "Giảng viên tạo cơ hội để bạn chủ động tham gia vào quá trình học tập",
    id: 11
  },
  {
    criteria: "Giảng viên giúp bạn phát triển kỹ năng làm việc độc lập",
    id: 12
  },
  {
    criteria: "Giảng viên rèn luyện cho bạn phương pháp liên hệ giữa các vấn đề trong môn học với thực tiễn",
    id: 13
  },
  {
    criteria: "Giảng viên sử dụng hiệu quả phương tiện dạy học",
    id: 14
  },
  {
    criteria: "Giảng viên quan tâm giáo dục tư cách phẩm chất nghề nghiệp của người học",
    id: 15
  },
  {
    criteria: "Bạn hiểu những vấn đề được truyền tải trên lớp",
    id: 16
  },
  {
    criteria: "Kết quả học tập của người học được đánh giá bằng nhiều hình thức phù hợp với tính chất và đặc thù môn học",
    id: 17
  },
  {
    criteria: "Nội dung kiểm tra đánh giá tổng hợp được các kỹ năng mà người học phải đạt theo yêu cầu",
    id: 18
  },
  {
    criteria: "Thông tin phản hồi từ kiểm tra đánh giá giúp bạn cải thiện kết quả học tập",
    id: 19
  },
  ]  
    await knex('reportofstudent').del()
    await knex('surveyform').del()
    await knex('surveyform').insert(form)
    return ("OK")
  } catch (err) {
    throw err
  }
} 

module.exports = {
  getForm,  
  deleteForm,
  createForm,
  checkUpdateForm,
  editCriteria,
  createCriteria,
  deleteCriteria ,
  reset
}