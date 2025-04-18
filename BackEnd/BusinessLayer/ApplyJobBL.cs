using System.Collections.Generic;
using JobPortalForFreshers.DataLayer;
using JobPortalForFreshers.Madals;
namespace JobPortalForFreshers.BusinessLayer
{
    public class ApplyJobBL
    {
        private readonly ApplyJobDAL _applyJobDAL;

        public ApplyJobBL(ApplyJobDAL applyJobDAL)
        {
            _applyJobDAL = applyJobDAL;
        }

        public List<AppliedJobModel> GetUserAppliedJobs(int userId)
        {
            return _applyJobDAL.GetUserAppliedJobs(userId);
        }
    }

}
