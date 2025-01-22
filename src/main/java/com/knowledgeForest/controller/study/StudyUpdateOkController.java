package com.knowledgeForest.controller.study;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.knowledgeForest.Execute;
import com.knowledgeForest.Result;
import com.knowledgeForest.dao.StudyDAO;
import com.knowledgeForest.dto.StudyDTO;

public class StudyUpdateOkController implements Execute {

	@Override
	public Result execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		StudyDAO studyDAO = new StudyDAO();
		StudyDTO studyDTO = new StudyDTO();
		
		Result result = new Result();
		
		HttpSession session = request.getSession();
		Integer studyNumber = (Integer)session.getAttribute("studyNumber");
		String path = null;
		
		if(studyNumber == null) {
			path = "/app/main/main-login.html";
		}else {
			path = "/app/board/boardUpdate.jsp";
			request.setAttribute(path, session);
		}
		
		result.setPath(path);
		result.setRedirect(false);
		return null;
	}

}
