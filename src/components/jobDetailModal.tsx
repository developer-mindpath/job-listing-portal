"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import DOMPurify from "dompurify";
import { JSX } from "react";

import { IJobData } from "@/app/page";

interface IJobDetailsModalProps {
  job: IJobData
  onClose: () => void;
}

/**
 * This component is used to show the job details in a modal
 * @param {IJobDetailsModalProps} props
 * @returns {JSX.Element} 
 */
export const JobDetailsModal=({
  job,
  onClose,
}: IJobDetailsModalProps): JSX.Element =>{
  const sanitizedHTML = DOMPurify.sanitize(job.description);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-6 border rounded-lg shadow-lg bg-white  relative">
        <p className="text-center">Job details</p>
        <div className="overflow-y-auto w-[700px] h-[500px] ">
        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
        <h2 className="text-lg ">
          <strong>Company Name :-</strong>
          {job.company_name}
        </h2>
        <p className="">
          <strong>Location :-</strong>
          {job.location}
        </p>
        <div>
          <p>
            <strong>Descripation</strong>
          </p>
          <div className="h-[300px] overflow-y-auto">
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
            {sanitizedHTML}
          </ReactMarkdown>
          </div>
        </div>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-500 "
        >
          View Job Posting
        </a>

        </div>
        <div  className="absolute top-4 right-6 cursor-pointer" onClick={onClose}>
          x
        </div>

      </div>
    </div>
  );
}
export default JobDetailsModal;
